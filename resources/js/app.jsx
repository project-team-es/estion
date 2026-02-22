import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  title: (title) => title,
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    // 構造化データ（JSON-LD）を定義
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'estion.(イーション)',
      url: 'https://estion.jp/',
      description:
        '新卒就活生向けのエントリーシート（ES）管理アプリ「estion.」です。多種多様な業界・企業を効率的に管理できます。',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://estion.jp/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };

    // HTMLに構造化データを埋め込む
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'application/ld+json');
    scriptTag.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);

    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});
