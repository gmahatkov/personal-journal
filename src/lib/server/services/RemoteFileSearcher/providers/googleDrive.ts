import type {
    RemoteFileSearchResult,
    RemoteFileSearchResultItem,
    IRemoteFileSearcherImageAsBuffer,
    RemoteFileSearcherImageAsBufferResponse
} from "$lib/types/RemoteFileSearcher";
import { RemoteFileSearcher } from "$lib/types/RemoteFileSearcher";
import { type drive_v3, google } from "googleapis";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import type { Account } from "@prisma/client";
import {file} from "googleapis/build/src/apis/file";

type GoogleDriveSearchParams = {
    nextPageToken?: string;
}

export class GoogleDrive extends RemoteFileSearcher<GoogleDriveSearchParams> implements IRemoteFileSearcherImageAsBuffer
{
    static async authorize(): Promise<void> {};
    private readonly account?: Account = undefined;
    private readonly drive?: drive_v3.Drive = undefined;
    constructor(accounts: Account[]) {
        super(accounts);
        this.account = accounts.find((account) => account.provider === "google-drive");
        if (!this.account) {
            throw new Error("Google Drive account not found");
        }
        const googleAuth = new google.auth.OAuth2({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        });
        googleAuth.setCredentials({
            refresh_token: this.account.refresh_token,
            access_token: this.account.access_token,
        });
        this.drive = google.drive({ version: "v3", auth: googleAuth });
        if (!this.drive) {
            throw new Error("Google Drive not initialized");
        }
    }
    private filesToSearchResultItem(file: drive_v3.Schema$File): RemoteFileSearchResultItem {
        return {
            url: `/api/images/google-drive/${file.id}`,
            name: file.name ?? "",
            dateCreated: file.createdTime ?? "",
            dateModified: file.modifiedTime ?? "",
            mimeType: file.mimeType ?? "",
        }
    }
    async search(params: GoogleDriveSearchParams): Promise<RemoteFileSearchResult> {
        try {
            const res = await this.drive?.files.list({
                pageSize: 10,
                pageToken: params.nextPageToken,
                q: `mimeType contains 'image/'`,
            });
            return {
                items: res?.data.files?.map(this.filesToSearchResultItem) ?? [],
                pagingParams: {
                    nextPageToken: res?.data.nextPageToken,
                },
            }
        } catch (e: any) {
            throw new Error(e?.stack ?? e?.response?.data?.error);
        }
    }
    async getImage(id: string): Promise<RemoteFileSearcherImageAsBufferResponse> {
        const res = await this.drive?.files.get({
            fileId: id,
            alt: "media",
        }, { responseType: "arraybuffer" });
        if (!res || !(res.data instanceof ArrayBuffer)) {
            throw new Error("Failed to get image");
        }
        return {
            buffer: Buffer.from(res.data),
            mimeType: res.data.mimeType ?? "image/jpeg",
        }
    }
}