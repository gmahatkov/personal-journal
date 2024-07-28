<script lang="ts">
    import { Card } from "flowbite-svelte";
</script>

<Card class="h-auto m-auto">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        <slot name="title">Title</slot>
    </h5>
    <slot name="helper-text"></slot>
    <slot />
</Card>