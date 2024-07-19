<script lang="ts">
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";

    function signOutAndRedirect() {
        signOut({ callbackUrl: "/" });
    }
</script>

<nav class="flex bg-blue-300 border border-b-blue-950 p-3 h-15 w-dvw items-center justify-between -mx-4 -mt-4">
    <div>
        Signed in as <b>{$page.data.session?.user?.name ?? "---"} ({$page.data.session?.user?.email} ?? "---")</b>
    </div>
    <button class="p-2 text-white text-sm font-bold bg-gray-600 rounded" on:click={signOutAndRedirect}>
        Sign out
    </button>
</nav>