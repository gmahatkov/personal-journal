export function trapIntersection(
    node: HTMLElement,
    options: {
        cb: (entries?: IntersectionObserverEntry[], node?: HTMLElement) => void,
        onDestroyCb?: (observer?: IntersectionObserver) => void,
    }):
    {
        destroy(): void
    }
{
    const observerOptions: IntersectionObserverInit = {
        root: document.body,
        threshold: 1,
        rootMargin: "0px",
    }
    const observer = new IntersectionObserver((entries) => {
        if (entries?.[0]?.isIntersecting === true) {
            options.cb(entries, node);
        }
    }, observerOptions);
    observer.observe(node);
    return {
        destroy() {
            options?.onDestroyCb?.(observer);
        }
    }
}