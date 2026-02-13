const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

const jwks = {
    keys: [
        {
            kty: 'RSA',
            n: crypto.createPublicKey(privateKey).export({ format: 'jwk' }).n,
            e: crypto.createPublicKey(privateKey).export({ format: 'jwk' }).e,
            use: 'sig',
            alg: 'RS256',
            kid: 'convex-auth-key-' + Date.now()
        }
    ]
};

console.log('---PRIVATE_KEY---');
console.log(privateKey);
console.log('---JWKS---');
console.log(JSON.stringify(jwks));
