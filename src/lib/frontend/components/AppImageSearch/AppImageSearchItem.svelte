<script lang="ts">
import { createEventDispatcher } from "svelte";
import {Card, Img, Spinner} from "flowbite-svelte";
import type {RemoteFileSearchResultItemUI} from "$lib/types/RemoteFileSearcher";
import { trapIntersection } from "$lib/frontend/actions/trapIntersection";

const dispatch = createEventDispatcher<{
    select: RemoteFileSearchResultItemUI;
    imageLoaded: string;
}>();

export let item: RemoteFileSearchResultItemUI;
export let loading: boolean = true;

let srcBase64: string = "";
let loadingImage = false;

$: showCard = item && (!loading || !loadingImage);

async function encode(array: ArrayBuffer): Promise<string> {
    return new Promise((resolve) => {
        const blob = new Blob([array]);
        const reader = new FileReader();

        reader.onload = (event) => {
            const dataUrl = event.target?.result ?? "";
            const [, base64] = (dataUrl as string).split(",");
            resolve(`data:${item.mimeType};base64,${base64}`);
        };

        reader.readAsDataURL(blob);
    });
}

async function loadImage(observer: IntersectionObserver) {
    if (!item || loading) return;
    if (item.cachedThumbnail) {
        srcBase64 = item.cachedThumbnail;
        observer.disconnect();
        return;
    }
    observer.disconnect();
    loadingImage = true;
    try {
        const res = await fetch(item.thumbnailUrl ? `${item.url}?thumbnail=${item.thumbnailUrl}` : item.url);
        const data = await res.arrayBuffer();
        srcBase64 = await encode(data);
        dispatch("imageLoaded", srcBase64);
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

<Card class="items-center max-w-[18rem] {showCard ? 'cursor-pointer' : 'cursor-progress' }"
      on:click={select}
>
    <div use:trapIntersection={{ cb: (_, __, observer) => loadImage(observer), threshold: 0.5 }} />
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
