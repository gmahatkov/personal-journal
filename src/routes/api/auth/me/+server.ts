import { json, type RequestEvent} from "@sveltejs/kit";
import { useAPIRoutesWithFallback } from "$lib/server/utils/APIRoute";

const { fallback, GET } = useAPIRoutesWithFallback({
    GET: async (event: RequestEvent) =>
    {
        const session = await event.locals.auth();
        const user = session?.user;
        return json({ user });
    },
})

export { fallback, GET };