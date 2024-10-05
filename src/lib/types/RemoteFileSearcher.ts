import type {Account} from "@prisma/client";

export interface RemoteFileSearchResultItem {
    id: string;
    url: string;
    name: string;
    dateModified?: string;
    dateCreated?: string;
    mimeType?: string;
    thumbnailUrl?: string;
}
export interface RemoteFileSearchResult {
    items: Array<RemoteFileSearchResultItem>;
    pagingParams: Record<string, any>;
}

export interface IRemoteFileSearcher
<SearchParams extends Record<string, any>>
{
    search(params: SearchParams): Promise<RemoteFileSearchResult>;
}

// Not all providers might require getting image as buffer logic
export type RemoteFileSearcherImageAsBufferResponse = {
    buffer?: Buffer,
    stream?: NodeJS.ReadableStream,
    mimeType: string,
};
export interface IRemoteFileSearcherImageAsBuffer {
    getImage(id: string): Promise<RemoteFileSearcherImageAsBufferResponse>;
    getThumbnail(id: string): Promise<RemoteFileSearcherImageAsBufferResponse>;
}

export interface IRemoteFileSearcherConstructor
<
    SearchParams extends Record<string, any>,
    ProviderName extends RemoteFileProviderName,
>
{
    new(accounts: Array<Account>): ProviderName extends RemoteFileProviderRequireImageAsBufferNames
        ? IRemoteFileSearcher<SearchParams> & IRemoteFileSearcherImageAsBuffer
        : IRemoteFileSearcher<SearchParams>;
}

export abstract class RemoteFileSearcher<SearchParams extends Record<string, string>> implements IRemoteFileSearcher<SearchParams>
{
    protected static async authorize(): Promise<void> {};
    abstract search(params: SearchParams): Promise<RemoteFileSearchResult>;
    protected constructor(accounts: Array<Account>) {}
}

export type RemoteFileProviderRequireImageAsBufferNames = "google-drive";

export type RemoteFileProviderName = RemoteFileProviderRequireImageAsBufferNames | "dropbox" | "onedrive";