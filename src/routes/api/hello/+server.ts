import {json, type RequestEvent} from "@sveltejs/kit";
import { useAPIRoutesWithFallback } from "$lib/server/utils/APIRoute";

const { fallback, GET } = useAPIRoutesWithFallback({
    GET: async (event: RequestEvent) =>
    {
        const message = event.url.searchParams.get("message") ?? "Hello from the server!";
        return json({message});
    },
});

export { fallback, GET };