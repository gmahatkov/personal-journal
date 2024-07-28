<script lang="ts">
    import { SignIn } from "@auth/sveltekit/components";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { P } from "flowbite-svelte";
    import { GoogleSolid, UserSolid } from "flowbite-svelte-icons";
    import AppAuth from "$lib/frontend/components/layout/AppAuth.svelte";

    onMount(() => {
        if ($page.data.session) {
            goto("/app/dashboard");
        }
    })
</script>

<AppAuth>
    <svelte:fragment slot="title">
        Sign in
    </svelte:fragment>
    <svelte:fragment slot="helper-text">
        <P class="text-gray-600 mb-4">
            Please sign in to continue.
        </P>
    </svelte:fragment>
    <SignIn provider="resend"
            className="sign-in-credentials">
        <input slot="email"
               type="email"
               id="email"
               name="email"
               class="sign-in-credentials_input"
               placeholder="Email"
        />
        <div slot="submitButton"
             class="sign-in-credentials_submit-button">
            <UserSolid />
        </div>
    </SignIn>
    <SignIn provider="google" className="sign-in-oauth">
        <div slot="submitButton"
             class="sign-in-oauth_submit-button">
            <GoogleSolid class="mr-4" />
            Sign in with Google
        </div>
    </SignIn>
</AppAuth>

<style lang="postcss">
    .sign-in-credentials {
        @apply mb-6 py-2 border-b w-full flex;
    }
    .sign-in-credentials_input {
        @apply my-2 w-full p-2.5
               focus:border-primary-500 focus:ring-primary-500
               bg-gray-50 text-gray-900 border border-gray-300
               text-sm rounded-l-lg;
    }
    .sign-in-credentials_submit-button {
        @apply text-center font-medium focus-within:ring-4 focus-within:outline-none
               inline-flex items-center justify-center px-5 py-2.5
               text-sm text-white bg-primary-700 border-t border-b border-r border-primary-500
               hover:bg-primary-800 focus-within:ring-blue-300 rounded-r-lg;
    }
    .sign-in-oauth {
        @apply py-2 w-full;
    }
    .sign-in-oauth_submit-button {
        @apply text-center font-medium focus-within:ring-4 focus-within:outline-none
               inline-flex items-center justify-center px-5 py-2.5
               text-sm text-gray-500 hover:text-gray-900 bg-white border
               border-gray-200 hover:bg-gray-50 focus-within:ring-gray-200 rounded-lg w-full;
    }
</style>