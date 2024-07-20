<script lang="ts">
    import { SignIn } from "@auth/sveltekit/components";
    import { page } from "$app/stores";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import { Card, Button, Input } from "flowbite-svelte";
    import { GoogleSolid, UserSolid } from "flowbite-svelte-icons";

    onMount(() => {
        if ($page.data.session) {
            goto("/app/dashboard");
        }
    })
</script>

{#if !$page.data.session }
    <Card class="h-auto m-auto">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Login</h5>
        <p class="text-gray-600 mb-4">Please sign in to continue.</p>
        <SignIn provider="resend" className="mb-6 py-2 border-b w-full flex">
            <input slot="email"
                   type="email"
                   id="email"
                   name="email"
                   class="my-2 w-full p-2.5 focus:border-primary-500 focus:ring-primary-500 bg-gray-50 text-gray-900
                          border border-gray-300 text-sm rounded-l-lg"
                   placeholder="Email"
            />
            <div slot="submitButton"
                 class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center
                        justify-center px-5 py-2.5 text-sm text-white bg-primary-700 border-t border-b border-r border-primary-500 hover:bg-primary-800
                        focus-within:ring-blue-300 rounded-r-lg">
                <UserSolid />
            </div>
        </SignIn>
        <SignIn provider="google" className="py-2 w-full">
            <div slot="submitButton"
                 class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center
                        justify-center px-5 py-2.5 text-sm text-gray-500 hover:text-gray-900 bg-white border
                        border-gray-200 hover:bg-gray-50 focus-within:ring-gray-200 rounded-lg w-full">
                <GoogleSolid class="mr-4" />
                Sign in with Google
            </div>
        </SignIn>
    </Card>
{/if}
