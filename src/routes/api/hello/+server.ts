import {json, type RequestEvent} from "@sveltejs/kit";
import {useAPIRoutes} from "$lib/server/utils/APIRoute";

const { fallback, GET } = useAPIRoutes({
    routes: {
        GET: async (event: RequestEvent) =>
        {
            const message = event.url.searchParams.get("message") ?? "Hello from the server!";
            return json({message});
        },
    },
    protectedRoutes: [
        { method: "GET", role: "EDITOR" },
    ],
});

export { fallback, GET };