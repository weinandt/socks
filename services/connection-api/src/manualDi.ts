function createResolvers() {
    return {
        Query: {
            curTime: () => new Date().toISOString()
        },
    };
}

export function runDI() {

    return {
        resolvers: createResolvers(),
    }
}