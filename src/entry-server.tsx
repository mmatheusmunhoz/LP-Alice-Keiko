import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { PAGE_SEO_CONFIG, buildStructuredData, resolvePageFromLocation } from './seo';

export { PRERENDER_ROUTES } from './seo';

export function render(url: string) {
  const page = resolvePageFromLocation(url);
  const seo = PAGE_SEO_CONFIG[page];
  const html = renderToString(<App initialPath={url} />);
  const jsonLd = buildStructuredData(page);

  return {
    html,
    seo,
    jsonLd,
  };
}
