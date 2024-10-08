import { json, error} from "@sveltejs/kit";
import { useAPIRoutes } from "$lib/server/utils/APIRoute";
import { createRemoteFileSearcher } from "$lib/server/services/RemoteFileSearcher/createRemoteFileSearcher";
import type {
    IRemoteFileSearcherImageAsBuffer,
    RemoteFileProviderName,
    RemoteFileProviderRequireImageAsBufferNames
} from "$lib/types/RemoteFileSearcher";
import type { RequestHandler } from "@sveltejs/kit";

const { fallback, GET } = useAPIRoutes({
    routes: {
        GET: (async (event) =>
        {
            try {
                const provider = event.params.provider as RemoteFileProviderRequireImageAsBufferNames;
                const id = event.params.id as string;
                const thumbnail = event.url.searchParams.get("thumbnail");
                const session = await event.locals.auth();
                const accounts = await event.locals.accounts({ session });
                const remoteFileSearcher = createRemoteFileSearcher(provider, accounts) satisfies IRemoteFileSearcherImageAsBuffer;
                const { buffer, mimeType} = thumbnail
                    ? await remoteFileSearcher.getThumbnail(thumbnail)
                    : await remoteFileSearcher.getImage(id);
                event.setHeaders({
                    "Content-Type": mimeType,
                    "Content-Disposition": `attachment; filename="${id}"`,
                    // "Cache-Control": "max-age=604800",
                });
                return new Response(buffer, { status: 200 });
            } catch (e) {
                error(500, "Unable to download image")
            }
        }),
    },
    protectedRoutes: [
        { method: "GET", role: "EDITOR" },
    ],
});

export { fallback, GET }