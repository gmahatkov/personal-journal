import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { getClient} from "$lib/server/data/utils/db";
import { building } from "$app/environment";
import type {Action, Handle} from "@sveltejs/kit";

if (!building) {
    console.log("======== SERVER STARTED ========");
}

function startUp(): { handle: Handle, signIn: Action, signOut: Action } {
    const mongoClientPromise = getClient();
    return SvelteKitAuth({
        providers: [
            Google({
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                authorization: {
                    params: {
                        access_type: 'offline',
                        prompt: 'consent',
                        scope: 'openid profile email https://www.googleapis.com/auth/drive.file',
                    },
                }
            })
        ],
        adapter: MongoDBAdapter(mongoClientPromise),
    });
}

export const { handle } = startUp();
