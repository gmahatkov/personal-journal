<script lang="ts">
    import AppTopNav from "$lib/frontend/components/layout/AppTopNav.svelte";
    import AppSideNav from "$lib/frontend/components/layout/AppSideNav.svelte";
    import { Footer } from "flowbite-svelte";
</script>

<div class="grid auto-rows-min grid-cols-12 grid-rows-layout w-full h-full">
    <header class="col-span-12">
        <AppTopNav />
    </header>
    <AppSideNav className="col-span-2 overflow-scroll p-4" />
    <section class="col-span-10 overflow-scroll p-4">
        <slot />
    </section>
    <Footer class="col-span-12 p-4">
        <div class="grid grid-cols-12">
            <div class="col-span-12 text-center">
                <p class="text-gray-500 text-sm">&nbsp;---&nbsp;</p>
            </div>
        </div>
    </Footer>
</div>
