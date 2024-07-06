<script lang="ts">
    import { onMount } from "svelte";
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { page } from "$app/stores";

    onMount(() => {});
</script>

{#if $page.data.session }
    <p>Signed in as <b>{ $page.data.session.user?.name ?? "USER" }</b></p>
    <button on:click={() => signOut()}>Sign out</button>
{:else}
    <button on:click={() => signIn("google")}>Sign in with Google</button>
{/if}
<style lang="postcss">
    :global(body) {
        background-color: theme('colors.gray.100');
        padding: theme('spacing.4');
    }
</style>