export function trapIntersection(
    node: HTMLElement,
    options: {
        cb: (entries: IntersectionObserverEntry[], node: HTMLElement, observer: IntersectionObserver) => void,
        onDestroyCb?: (observer?: IntersectionObserver) => void,
        once?: boolean,
        threshold?: number,
    }):
    {
        destroy(): void
    }
{
    const observerOptions: IntersectionObserverInit = {
        root: document.body,
        threshold: options.threshold ?? 0,
        rootMargin: "0px",
    }
    const observer = new IntersectionObserver((entries) => {
        if (entries?.[0]?.isIntersecting === true) {
            options.cb(entries, node, observer);
        }
        if (options.once) {
            observer.disconnect();
        }
    }, observerOptions);
    observer.observe(node);
    return {
        destroy() {
            observer.disconnect();
            options?.onDestroyCb?.(observer);
        }
    }
}