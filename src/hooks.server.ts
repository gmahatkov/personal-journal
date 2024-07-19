import { sequence } from "@sveltejs/kit/hooks";
import { handle as handleAuth } from "$lib/server/auth/handles/handleAuth";
import { handleGetAccounts } from "$lib/server/auth/handles/handleGetAccounts";

export const handle = sequence(
    handleAuth,
    handleGetAccounts,
);