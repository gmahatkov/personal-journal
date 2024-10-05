<script lang="ts">
    import { Sidebar, SidebarGroup, SidebarWrapper, SidebarItem } from "flowbite-svelte";
    import { HomeSolid, GoogleSolid } from "flowbite-svelte-icons";
    import { page } from "$app/stores";

    export let className: string = "";

    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}
         asideClass={`w-full h-full border-gray-100 shadow-md ${className}`}
         activeClass="bg-white flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
    <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded bg-white h-full">
        <SidebarGroup>
            <SidebarItem label="Dashboard" href="/app/dashboard">
                <svelte:fragment slot="icon">
                    <HomeSolid class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                </svelte:fragment>
            </SidebarItem>
            <SidebarItem label="Add from Google" href="/app/dashboard/google-drive">
                <svelte:fragment slot="icon">
                    <GoogleSolid class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                </svelte:fragment>
            </SidebarItem>
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>
