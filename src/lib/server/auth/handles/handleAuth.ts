import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET, AUTH_SALT} from '$env/static/private';
import { dev} from "$app/environment";
import { prismaAdapter } from "$lib/server/data/utils/db";
import type { SvelteKitAuthConfig } from "@auth/sveltekit";

const config: SvelteKitAuthConfig = {
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
            },
        })
    ],
    adapter: prismaAdapter,
    session: {
        strategy: "jwt",
    },
    secret: AUTH_SECRET,
    debug: dev,
};

export const { handle } = SvelteKitAuth(config);