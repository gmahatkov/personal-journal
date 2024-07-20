<script lang="ts">
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";

    onMount(() => {
        if (!$page.data.session) {
            goto("/signin");
        } else {
            goto("/app/dashboard");
        }
    })
</script>