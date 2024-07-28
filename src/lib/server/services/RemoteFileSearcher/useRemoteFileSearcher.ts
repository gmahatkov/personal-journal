import type {
    IRemoteFileSearcherConstructor,
    IRemoteFileSearcher,
    RemoteFileProviderName,
    RemoteFileProviderRequireImageAsBufferNames,
    IRemoteFileSearcherImageAsBuffer
} from "$lib/types/RemoteFileSearcher";
import {GoogleDrive} from "$lib/server/services/RemoteFileSearcher/providers/googleDrive";
import type {Account} from "@prisma/client";

const RemoteFileProviderMap: Map<
    RemoteFileProviderName,
    IRemoteFileSearcherConstructor<
        Record<string, any>,
        RemoteFileProviderName
    >
> = new Map([
    ["google-drive", GoogleDrive],
    ["dropbox", GoogleDrive],
    ["onedrive", GoogleDrive],
]);

export function useRemoteFileSearcher
<
    SearchParams extends Record<string, any>,
    ProviderName extends RemoteFileProviderName,
>
(provider: ProviderName, accounts: Account[]): ProviderName extends RemoteFileProviderRequireImageAsBufferNames
    ? IRemoteFileSearcher<SearchParams> & IRemoteFileSearcherImageAsBuffer
    : IRemoteFileSearcher<SearchParams>
{
    const ctor = RemoteFileProviderMap.get(provider);
    if (!ctor) {
        throw new Error(`Remote file provider not found: ${provider}`);
    }
    return new ctor(accounts) as ProviderName extends RemoteFileProviderRequireImageAsBufferNames
        ? IRemoteFileSearcher<SearchParams> & IRemoteFileSearcherImageAsBuffer
        : IRemoteFileSearcher<SearchParams>
}