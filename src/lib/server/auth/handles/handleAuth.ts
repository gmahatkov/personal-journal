import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import Resend from "@auth/core/providers/resend";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET, AUTH_RESEND_KEY} from '$env/static/private';
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
        Google({
            id: 'google-drive',
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: 'offline',
                    prompt: 'consent',
                    scope:
                        'openid profile email ' +
                        'https://www.googleapis.com/auth/drive ' +
                        'https://www.googleapis.com/auth/drive.appdata ' +
                        'https://www.googleapis.com/auth/drive.file ' +
                        'https://www.googleapis.com/auth/drive.meet.readonly ' +
                        'https://www.googleapis.com/auth/drive.metadata ' +
                        'https://www.googleapis.com/auth/drive.metadata.readonly ' +
                        'https://www.googleapis.com/auth/drive.photos.readonly ' +
                        'https://www.googleapis.com/auth/drive.readonly',
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