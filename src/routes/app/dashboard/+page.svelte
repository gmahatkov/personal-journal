<script lang="ts">
    import AppDashboard from "$lib/frontend/components/layout/AppDashboard.svelte";
</script>

<AppDashboard>
    <svelte:fragment slot="title">Home</svelte:fragment>
    <slot />
</AppDashboard>