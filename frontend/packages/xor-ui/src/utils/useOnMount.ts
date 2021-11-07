import {EffectCallback, useEffect} from "react";

export default function useOnMount(f: EffectCallback) {
    // We want this to only run once, when the component is mounted, so the list of dependencies is empty
    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(f, []);
}
