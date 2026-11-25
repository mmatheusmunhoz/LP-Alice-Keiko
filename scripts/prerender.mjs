import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr', 'entry-server.js');

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function applySeoToTemplate(template, { html, seo, jsonLd }) {
  let output = template;

  // Replace <title>
  output = output.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtmlText(seo.title)}</title>`
  );

  // Replace meta description
  output = output.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtmlAttr(seo.description)}" />`
  );

  // Replace canonical URL
  output = output.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtmlAttr(seo.canonicalUrl)}" />`
  );

  // Replace OpenGraph tags
  output = output.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtmlAttr(seo.canonicalUrl)}" />`
  );
  output = output.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtmlAttr(seo.ogTitle)}" />`
  );
  output = output.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtmlAttr(seo.ogDescription)}" />`
  );

  // Replace Twitter tags
  output = output.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtmlAttr(seo.title)}" />`
  );
  output = output.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtmlAttr(seo.description)}" />`
  );

  // Inject static JSON-LD inside <head> (removing any prior script with same id)
  output = output.replace(
    /\s*<script[^>]*id="schema-structured-data"[^>]*>[\s\S]*?<\/script>/i,
    ''
  );
  const jsonLdTag = `    <script id="schema-structured-data" type="application/ld+json">${serializeJsonLd(jsonLd)}</script>\n  </head>`;
  output = output.replace(/<\/head>/i, jsonLdTag);

  // Inject full prerendered HTML inside <div id="root">
  output = output.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${html}</div>`
  );

  return output;
}

async function main() {
  const templatePath = path.resolve(distDir, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const { render, PRERENDER_ROUTES } = await import(pathToFileURL(ssrEntryPath).href);

  for (const route of PRERENDER_ROUTES) {
    const rendered = render(route);
    const finalHtml = applySeoToTemplate(template, rendered);

    const outFile =
      route === '/'
        ? path.resolve(distDir, 'index.html')
        : path.resolve(distDir, route.replace(/^\//, ''), 'index.html');

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, finalHtml, 'utf-8');
    console.log(`[prerender] Generated ${path.relative(rootDir, outFile)} (${finalHtml.length} bytes)`);
  }
}

main().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
