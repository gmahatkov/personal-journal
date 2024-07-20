<script lang="ts">
    import { signIn } from "@auth/sveltekit/client";
    import { page } from "$app/stores";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import { Card, Button } from "flowbite-svelte";

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
        <Button on:click={() => signIn("google")} outline color="light">
            Sign in with Google
        </Button>
    </Card>
{/if}
