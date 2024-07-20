import { signIn } from "$lib/server/auth/handles/handleAuth";
import type { Actions } from "./$types"

export const actions: Actions = { default: signIn }