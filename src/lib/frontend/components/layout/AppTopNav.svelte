<script lang="ts">
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
    import { Navbar, NavBrand, Dropdown, DropdownItem, DropdownHeader, Avatar, NavHamburger } from 'flowbite-svelte'

    function signOutAndRedirect() {
        signOut({ callbackUrl: "/" });
    }
</script>

<Navbar shadow>
    <NavBrand>Personal Journal</NavBrand>
    <div class="flex items-center md:order-2">
        <Avatar id="avatar-menu" src="{$page.data.session?.user?.image ?? ''}" />
        <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
        <DropdownHeader>
            <span class="block text-sm">{$page.data.session?.user?.name ?? "-"}</span>
            <span class="block truncate text-sm font-medium">{$page.data?.session?.user?.email ?? "-"}</span>
        </DropdownHeader>
        <DropdownItem on:click={signOutAndRedirect}>Sign out</DropdownItem>
    </Dropdown>
</Navbar>