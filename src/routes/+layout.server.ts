import { type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async function (event) {
    return {
        session: await event.locals.auth(),
    }
}
