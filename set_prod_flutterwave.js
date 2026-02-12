const { spawnSync } = require('child_process');

/**
 * Script to set Flutterwave environment variables for production in Convex
 */

const FLUTTERWAVE_CONFIG = {
    FLUTTERWAVE_SECRET_KEY: 'FLWSECK_TEST-6478ea67c9a871d29d95e52b12212d61-X',
    FLUTTERWAVE_WEBHOOK_HASH: '8f3c9a7d2e6b4f1a9c0d5e2b7a8f6c3d'
};

function setEnv(name, value) {
    if (value.startsWith('YOUR_')) {
        console.warn(`⚠️ Skipping ${name}: Please replace placeholders with actual values.`);
        return true;
    }

    console.log(`Setting ${name} for Production...`);
    const result = spawnSync('npx', ['convex', 'env', 'set', name, value, '--prod'], {
        encoding: 'utf-8',
        shell: true
    });

    if (result.status !== 0) {
        console.error(`❌ Failed to set ${name}:`, result.stderr);
        return false;
    }

    console.log(`✅ Successfully set ${name}`);
    return true;
}

console.log('--- Setting Production Flutterwave Configuration ---');

let allSuccess = true;
for (const [key, value] of Object.entries(FLUTTERWAVE_CONFIG)) {
    if (!setEnv(key, value)) {
        allSuccess = false;
    }
}

if (allSuccess) {
    console.log('\n🎉 Configuration script finished.');
} else {
    console.log('\n⚠️ Some keys failed to update.');
}
