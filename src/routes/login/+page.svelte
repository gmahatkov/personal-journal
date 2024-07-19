<script lang="ts">
    import { signIn } from "@auth/sveltekit/client";
    import { page } from "$app/stores";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    onMount(() => {
        if ($page.data.session) {
            goto("/app/dashboard");
        }
    })
</script>

{#if !$page.data.session }
    <div class="w-1/3 h-1/3 p-2 border-2 border-gray-300 rounded flex m-auto">
        <button class="py-1 px-3 bg-blue-800 text-white rounded w-auto h-auto m-auto text-2xl"
                on:click={() => signIn("google")}
        >
            Sign in with Google
        </button>
    </div>
{/if}
