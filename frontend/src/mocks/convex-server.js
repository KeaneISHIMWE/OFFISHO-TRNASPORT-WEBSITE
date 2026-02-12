// Mock for convex/server to allow client-side bundling
// This creates function references compatible with Convex's useQuery/useMutation

export const anyApi = new Proxy({}, {
    get: (_, moduleName) => {
        if (typeof moduleName === 'symbol') return undefined;

        return new Proxy({}, {
            get: (_, functionName) => {
                if (typeof functionName === 'symbol') return undefined;
                // Return a string - Convex client accepts both strings and objects
                return `${moduleName}:${functionName}`;
            }
        });
    }
});

export const componentsGeneric = () => ({});
