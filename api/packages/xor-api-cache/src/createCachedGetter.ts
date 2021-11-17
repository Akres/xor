import {ICachedValue} from "./ICachedValue";

function isValid(value: ICachedValue): boolean {
    return Date.now() < value.validUntil;
}

export default function createCachedGetter<P extends any[], V extends ICachedValue>(
    keyGetter: (...args: P) => string,
    getter: (...args: P) => Promise<V>
): (...args: P) => Promise<V> {
    const cache = new Map<string, V>();

    return async function(...args: P): Promise<V> {
        const key = keyGetter(...args);
        const cachedValue = cache.get(key);

        if (cachedValue && isValid(cachedValue)) {
            // hit
            return cachedValue;
        }

        // miss
        const newValue = await getter(...args);
        cache.set(key, newValue);
        return newValue;
    };
}
