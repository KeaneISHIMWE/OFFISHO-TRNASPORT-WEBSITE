// Mock for convex/server to allow client-side bundling
// This creates function references that match Convex's expected format

const createFunctionReference = (path) => {
    // Convex function references need specific properties
    const ref = {
        _functionName: path,
        toString: () => path,
    };

    // Make it look like a function reference
    Object.defineProperty(ref, Symbol.toStringTag, {
        value: 'FunctionReference',
        configurable: true
    });

    return ref;
};

export const anyApi = new Proxy({}, {
    get: (_, moduleName) => {
        if (typeof moduleName === 'symbol') return undefined;

        return new Proxy({}, {
            get: (_, functionName) => {
                if (typeof functionName === 'symbol') return undefined;
                return createFunctionReference(`${moduleName}:${functionName}`);
            }
        });
    }
});

export const componentsGeneric = () => ({});
