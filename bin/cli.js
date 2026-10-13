#!/usr/bin/env node

const open = require('open');
const { execSync } = require('child_process');

console.log("🚀 Launching Nexus Setup...");

// 1. Automatically opens your website
open('');

// 2. Clones or fetches your repository files
try {
  console.log("📦 Pulling latest template assets from Git...");
  execSync('git clone https://github.com/your-username/nexus-repo.git my-nexus-app', { stdio: 'inherit' });
  console.log("✅ Success! Nexus project initialized.");
} catch (error) {
  console.error("⚠️ Git task skipped or failed.");
}
