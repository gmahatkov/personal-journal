import { json, error, type RequestEvent} from "@sveltejs/kit";
import { useAPIRoutes } from "$lib/server/utils/APIRoute";
import { createRemoteFileSearcher } from "$lib/server/services/RemoteFileSearcher/createRemoteFileSearcher";
import type {Account} from "@prisma/client";
import type {RemoteFileProviderName} from "$lib/types/RemoteFileSearcher";

const { fallback, GET } = useAPIRoutes({
    routes: {
        GET: async (event: RequestEvent) =>
        {
            try {
                const provider = event.params.provider as RemoteFileProviderName;
                const nextPageToken = event.url.searchParams.get("nextPageToken");
                const session = await event.locals.auth();
                const accounts: Array<Account> = await event.locals.accounts({ session });
                const remoteFileSearcher = createRemoteFileSearcher(provider, accounts);
                const res = await remoteFileSearcher.search({
                    nextPageToken,
                });
                return json(res);
            } catch (err: any) {
                console.error(err);
                error(500, err);
            }
        },
    },
    protectedRoutes: [
        { method: "GET", role: "EDITOR" },
    ],
})

export { fallback, GET };