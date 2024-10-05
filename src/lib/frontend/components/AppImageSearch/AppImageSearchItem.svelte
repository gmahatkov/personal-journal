<script lang="ts">
import { createEventDispatcher } from "svelte";
import {Card, Img, Spinner} from "flowbite-svelte";
import type {RemoteFileSearchResultItem} from "$lib/types/RemoteFileSearcher";

const dispatch = createEventDispatcher<{
    select: RemoteFileSearchResultItem;
}>();

export let item: RemoteFileSearchResultItem;
export let loading: boolean = true;

let srcBase64: string = "";
let loadingImage = false;

$: showCard = item && (!loading || !loadingImage);
$: if (item.thumbnailUrl || item.url) loadImage();

async function encode(array: ArrayBuffer): Promise<string> {
    return new Promise((resolve) => {
        const blob = new Blob([array]);
        const reader = new FileReader();

        reader.onload = (event) => {
            const dataUrl = event.target?.result ?? "";
            resolve(dataUrl as string);
        };

        reader.readAsDataURL(blob);
    });
}

async function loadImage() {
    if (!item || loading) return;
    loadingImage = true;
    try {
        const res = await fetch(item.thumbnailUrl ? `${item.url}?thumbnail=${item.thumbnailUrl}` : item.url);
        const data = await res.arrayBuffer();
        srcBase64 = await encode(data);
    } catch (error) {
        console.error(error);
    } finally {
        loadingImage = false;
    }
}

function select() {
    console.log("select: ", item.id);
    if (!item) return;
    dispatch("select", item);
}
</script>

<Card class="items-center max-w-[18rem] {showCard ? 'cursor-pointer' : 'cursor-progress' }" on:click={select}>
    {#if showCard && srcBase64.length}
    <Img src={srcBase64}
         alt={item.name}
         size="cover"
         caption={item.name}
    />
    {:else}
    <div class="w-[200px] h-[228px] flex items-center justify-center">
        <Spinner />
    </div>
    {/if}
</Card>
