import { copyFile } from 'node:fs/promises';

const source = new URL('../dist/index.html', import.meta.url);
const target = new URL('../dist/404.html', import.meta.url);

await copyFile(source, target);
console.log('Created dist/404.html (SPA fallback for deep links).');
