<script lang="ts">
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    onMount(() => {
        if (!$page.data.session) {
            redirect(307, "/");
        }
    })
</script>

<slot />