import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import Resend from "@auth/core/providers/resend";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET, AUTH_SALT, AUTH_RESEND_KEY} from '$env/static/private';
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
                    scope: 'openid profile email',
                },
            },
        }),
        Resend({
            apiKey: AUTH_RESEND_KEY,
            from: 'delivered@resend.dev',
        }),
    ],
    adapter: prismaAdapter,
    session: {
        strategy: "jwt",
    },
    secret: AUTH_SECRET,
    debug: dev,
};

export const { handle, signIn } = SvelteKitAuth(config);