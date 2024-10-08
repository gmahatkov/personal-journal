<script lang="ts">
import AppImageSearchItem from "$lib/frontend/components/AppImageSearch/AppImageSearchItem.svelte";
import {Spinner} from "flowbite-svelte";
import type {RemoteFileSearchResultItemUI} from "$lib/types/RemoteFileSearcher";
import {DEFAULT_PAGE_SIZE} from "$lib/config/consts";
import {onMount} from "svelte";
import {trapIntersection} from "$lib/frontend/actions/trapIntersection";

let loading = false;
let nextPageToken: string | null = null;
let currentPageToken: string = "FIRST";
let latestPageToken: string = "FIRST";

const pages: Record<string, RemoteFileSearchResultItemUI[]> = {};

$: pagesInView = Object.entries(pages).reduce((acc, [token, images], idx, arr) => {
    const currentPageIdx = arr.findIndex(([t]) => t === currentPageToken);
    if (idx < currentPageIdx - 1 || idx > currentPageIdx + 1) return acc;
    acc.push([token, images]);
    return acc;
}, [] as [string, RemoteFileSearchResultItemUI[]][]);

async function loadImages() {
    loading = true;
    pages[nextPageToken ?? "FIRST"] = createSkeletonImageSet();
    try {
        const res = await fetch("/api/search/google-drive?" + (nextPageToken ? `&nextPageToken=${nextPageToken}` : ""));
        const data = await res.json();
        const delta = DEFAULT_PAGE_SIZE - data.items?.length;
        const images = pages[nextPageToken ?? "FIRST"];
        for (let image of images) {
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
                    image.cachedThumbnail = null;
                }
            }
        }
        images.splice(-delta, delta);
        latestPageToken = nextPageToken ?? "FIRST";
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

function createSkeletonImageSet(): RemoteFileSearchResultItemUI[] {
    return new Array<RemoteFileSearchResultItemUI>(DEFAULT_PAGE_SIZE)
        .fill({
            id: "",
            name: "",
            url: "",
        })
        .map((item) => ({
            ...item,
            id: crypto.randomUUID(),
        }));
}

function onScroll(entries: IntersectionObserverEntry[], node: HTMLElement, observer: IntersectionObserver)
{
    const token = node?.getAttribute("data-token");
    currentPageToken = token ?? "FIRST";
}

function setItemCache(item: RemoteFileSearchResultItemUI, cachedThumbnail: string) {
    if (!item.cachedThumbnail) {
        item.cachedThumbnail = cachedThumbnail;
    }
}

onMount(loadImages);
</script>

{#each pagesInView as [token, page] (token)}
    <div class="grid grid-cols-4 gap-6 mb-6" data-token={token} use:trapIntersection={{ cb: onScroll }}>
    {#each page as item (item.id)}
        <AppImageSearchItem {item} {loading} on:imageLoaded={(evt) => setItemCache(item, evt.detail)} />
    {/each}
    </div>
{/each}
{#if !loading && nextPageToken}
    <footer
        class="p-8 flex items-center justify-center"
        use:trapIntersection={{
            cb: loadOnFooterIntersected,
    }}>
        <Spinner />
    </footer>
{/if}