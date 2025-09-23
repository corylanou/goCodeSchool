#!/usr/bin/env node
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function collectUrls(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /https?:\/\/[^\s)\]]+/g;
  const matches = content.match(regex) || [];
  const unique = Array.from(new Set(matches));
  const skipPatterns = [/https:\/\/\.\.\./];
  return unique
    .map((url) => ({
      url,
      skip: skipPatterns.some((pattern) => pattern.test(url)),
    }))
    .filter((entry) => {
      if (!entry.skip) {
        return true;
      }
      console.log(`Skipping placeholder URL: ${entry.url}`);
      return false;
    })
    .map((entry) => entry.url);
}

async function main() {
  const tutorialPath = path.join(__dirname, '..', 'tutorials', 'secrets-and-safety.md');
  if (!fs.existsSync(tutorialPath)) {
    console.error(`Tutorial file not found at ${tutorialPath}`);
    process.exit(1);
  }

  const urls = await collectUrls(tutorialPath);
  if (urls.length === 0) {
    console.log('No URLs detected in tutorial.');
    return;
  }

  console.log(`Checking ${urls.length} URLs from secrets-and-safety tutorial...\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (const url of urls) {
    const result = { url };
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      if (response) {
        result.status = response.status();
        result.finalUrl = page.url();
        result.ok = response.ok();
      } else {
        // Some navigations (like GitHub redirects) may return null, treat as success if we ended up on a URL
        result.status = 'no-response-object';
        result.finalUrl = page.url();
        result.ok = true;
      }
    } catch (error) {
      result.error = error.message;
    }
    results.push(result);
  }

  await browser.close();

  const okResults = results.filter((r) => r.ok);
  const failures = results.filter((r) => !r.ok);

  for (const { url, status, finalUrl, error } of results) {
    if (error) {
      console.log(`❌ ${url}\n    Error: ${error}`);
    } else if (status === 'no-response-object' || (typeof status === 'number' && status >= 200 && status < 400)) {
      const statusText = status === 'no-response-object' ? 'OK (no response object)' : status;
      if (finalUrl && finalUrl !== url) {
        console.log(`✅ [${statusText}] ${url}\n    → ${finalUrl}`);
      } else {
        console.log(`✅ [${statusText}] ${url}`);
      }
    } else {
      console.log(`⚠️ [${status}] ${url}${finalUrl && finalUrl !== url ? `\n    → ${finalUrl}` : ''}`);
    }
  }

  console.log('\nSummary:');
  console.log(`  ✅ ${okResults.length} succeeded`);
  console.log(`  ⚠️ ${failures.length} failed`);

  if (failures.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
