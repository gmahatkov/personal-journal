import { json } from "@sveltejs/kit";
import type { RequestHandler} from "@sveltejs/kit";

export const GET: RequestHandler<{ message: string }> = async function(event) {
    const message = event.url.searchParams.get("message") ?? "Hello from the server!";
    return json({ message });
}