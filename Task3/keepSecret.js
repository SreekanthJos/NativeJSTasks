function createSecretHolder(secret) {
    return {
        getSecret: () => secret,
        setSecret: (val) => secret = val
    };
}