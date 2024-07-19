// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from "@auth/core";
import type { DefaultJWT } from "@auth/core/jwt";
import type {Account} from "@prisma/client";
import type {AccountsHandleParams} from "$lib/server/auth/handles/handleGetAccounts";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			accounts: (params: AccountsHandleParams) => Promise<Account | any>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface IExtendedUser extends User{
			token?: string;
		}
	}
}

declare module "@auth/core/adapters" {
	interface AdapterUser extends App.IExtendedUser {}
}

declare module "@auth/core/jwt" {
	interface DefaultJWT extends DefaultJWT {
		accessToken?: string;
		refreshToken?: string;
	}
}

export {};
