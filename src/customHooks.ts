import React from 'react';

export function useEffectAfterMount(cb: any, dependencies: any) {
    const justMounted = React.useRef(true);
    React.useEffect(() => {
        if (!justMounted.current) {
            return cb()
        }
        justMounted.current = false;
    }, dependencies)
}
