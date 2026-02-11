export const anyApi = new Proxy({}, {
    get: (_, moduleName) => new Proxy({}, {
        get: (_, functionName) => ({ _functionName: `${moduleName}:${functionName}` })
    })
});

export const componentsGeneric = () => ({});
