/**
 * Temporary utility to generate a hash for our passkey
 * This file should be removed after generating the hash
 */

import CryptoJS from 'crypto-js';

const SALT = 'kap-legal-llp-secure-salt-2025';
const PASSKEY = 'KAP-LEGAL-ADMIN-2025';

// Generate the hash
const hash = CryptoJS.SHA256(PASSKEY + SALT).toString();

console.log('Generated hash for passkey:', hash);

// This is just a utility script and doesn't need to export anything
