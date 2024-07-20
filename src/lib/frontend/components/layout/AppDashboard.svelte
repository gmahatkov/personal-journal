<script>
    import {Card, Heading} from "flowbite-svelte";
</script>

<Card class="bg-white w-full h-full rounded" shadow size="none">
    <Heading tag="h3" class="mb-4">
        <slot name="title">Title</slot>
    </Heading>
    <slot>&nbsp;</slot>
</Card>