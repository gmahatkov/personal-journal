<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        console.log("This is a +page");
    });
</script>

<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>

<style lang="postcss">
    :global(body) {
        background-color: theme('colors.gray.100');
        padding: theme('spacing.4');
    }
</style>