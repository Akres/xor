
type DebouncedFun<P extends any[]> = (...params: P) => any;

export default function debounce<P extends any[]>(f: DebouncedFun<P>, timeout: number): DebouncedFun<P> {
    let cancelTimeoutHandle: ReturnType<typeof setTimeout>;
    return function(...params: P) {
        if (cancelTimeoutHandle) {
            clearTimeout(cancelTimeoutHandle);
        }

        cancelTimeoutHandle = setTimeout(() => f(...params), timeout);
    };
}
