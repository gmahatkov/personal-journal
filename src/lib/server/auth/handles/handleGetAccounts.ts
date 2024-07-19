import { prisma } from "$lib/server/data/utils/db";
import type {Handle} from "@sveltejs/kit";
import type {Session} from "@auth/core/types";
import type {Account} from "@prisma/client";

export type AccountsHandleParams = {
    session: Session | null;
    providerTypes?: string[];
}

const accounts = async ({ session, providerTypes = [] }: AccountsHandleParams): Promise<Account | any> => {
    if (!session?.user?.email) {
        return [];
    }
    const accounts = await prisma.user
        .findUnique({
            where: {
                email: String(session?.user?.email),
            },
        })
        ?.accounts();
    return accounts ?? [];
}

export const handleGetAccounts: Handle = async ({ event, resolve }) => {
    event.locals.accounts = accounts;
    return resolve(event);
}
