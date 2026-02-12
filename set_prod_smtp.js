const { spawnSync } = require('child_process');

/**
 * Script to set SMTP environment variables for production in Convex
 * These values are taken from CONVEX_ENV_SETUP.md
 */

const SMTP_CONFIG = {
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '587',
    SMTP_USER: 'keaneishimwe@gmail.com',
    SMTP_PASS: 'mytc rgrj caux eriw',
    SMTP_SECURE: 'false'
};

function setEnv(name, value) {
    console.log(`Setting ${name} for Production...`);
    // Wrap value in quotes to handle spaces
    const result = spawnSync('npx', ['convex', 'env', 'set', name, `"${value}"`, '--prod'], {
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

console.log('--- Setting Production SMTP Configuration ---');

let allSuccess = true;
for (const [key, value] of Object.entries(SMTP_CONFIG)) {
    if (!setEnv(key, value)) {
        allSuccess = false;
    }
}

if (allSuccess) {
    console.log('\n🎉 All production SMTP keys updated successfully!');
    console.log('Wait a few moments for Convex to redeploy your functions');
} else {
    console.log('\n⚠️ Some keys failed to update. Please check the errors above.');
}
