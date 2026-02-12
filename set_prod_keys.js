const { spawnSync } = require('child_process');
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

const jwk = crypto.createPublicKey(privateKey).export({ format: 'jwk' });
const jwks = {
    keys: [
        {
            kty: 'RSA',
            n: jwk.n,
            e: jwk.e,
            use: 'sig',
            alg: 'RS256',
            kid: 'convex-auth-key-' + Date.now()
        }
    ]
};

const privateKeyStr = privateKey.trim();
const jwksStr = JSON.stringify(jwks);

function setEnv(name, value) {
    console.log(`Setting ${name}...`);
    // NO value argument - it will read from stdin
    const result = spawnSync('npx', ['convex', 'env', 'set', name, '--prod'], {
        input: value,
        encoding: 'utf-8',
        shell: true
    });
    if (result.status !== 0) {
        console.error(`Failed to set ${name}:`, result.stderr);
        return false;
    }
    console.log(result.stdout.trim());
    return true;
}

if (setEnv('JWT_PRIVATE_KEY', privateKeyStr)) {
    if (setEnv('JWKS', jwksStr)) {
        if (setEnv('SITE_URL', 'https://offisho-trnasport-website.vercel.app')) {
            console.log('Successfully updated all production auth keys!');
        }
    }
}
