<script lang="ts">
import AppImageSearchItem from "$lib/frontend/components/AppImageSearch/AppImageSearchItem.svelte";
import {Spinner} from "flowbite-svelte";
import type {RemoteFileSearchResultItem} from "$lib/types/RemoteFileSearcher";
import {DEFAULT_PAGE_SIZE} from "$lib/config/consts";
import {onMount} from "svelte";
import {trapIntersection} from "$lib/frontend/actions/trapIntersection";

let images: Array<RemoteFileSearchResultItem> = [];

let loading = false;
let nextPageToken: string | null = null;

async function loadImages() {
    loading = true;
    images = images.concat(createSkeletonImageSet());
    try {
        const res = await fetch("/api/search/google-drive?" + (nextPageToken ? `&nextPageToken=${nextPageToken}` : ""));
        const data = await res.json();
        const delta = DEFAULT_PAGE_SIZE - data.items?.length;
        for (const image of images) {
            if (!image.url) {
                const item = data.items?.shift();
                if (item) {
                    image.id = item.id;
                    image.name = item.name;
                    image.url = item.url;
                    image.thumbnailUrl = item.thumbnailUrl;
                    image.dateCreated = item.dateCreated;
                    image.mimeType = item.mimeType;
                    image.dateModified = item.dateModified;
                }
            }
        }
        images.splice(-delta, delta);
        nextPageToken = data.pagingParams?.nextPageToken;
    } catch (error) {
        console.error(error);
    } finally {
        loading = false;
    }
}

function loadOnFooterIntersected() {
    loadImages();
}

function createSkeletonImageSet(): RemoteFileSearchResultItem[] {
    return new Array<RemoteFileSearchResultItem>(DEFAULT_PAGE_SIZE)
        .fill({
            id: "",
            name: "",
            url: "",
        })
        .map((item, i) => ({
            ...item,
            id: crypto.randomUUID(),
        }));
}

onMount(loadImages);
</script>

<div class="grid grid-cols-4 gap-6">
    {#each images as item (item.id)}
        <AppImageSearchItem {item} {loading} />
    {/each}
</div>
{#if !loading && nextPageToken}
    <footer
        class="p-8 flex items-center justify-center"
        use:trapIntersection={{
            cb: loadOnFooterIntersected,
            onDestroyCb(observer) {
                observer?.disconnect();
            },
    }}>
        <Spinner />
    </footer>
{/if}