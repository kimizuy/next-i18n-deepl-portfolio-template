A internationalized portfolio templates with Next.js and [DeepL](https://www.deepl.com/). Markdowns written in the default language are automatically translated at build time.

Demo: https://next-i18n-deepl-portfolio-template.vercel.app/

Features:

- [Next.js](https://nextjs.org/) App Router
- Automatic translation with [DeepL Translate API](https://www.deepl.com/pro-api)
- Internationalization with [next-i18n-router](https://github.com/i18nexus/next-i18n-router)
- Support for TypeScript
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Content management with [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)
- Dark mode

Does DeepL support your language? Check by following the link below:

https://www.deepl.com/docs-api/translate-text/translate-text

## Getting Started

1. Your DeepL API key is required. This API is free to start using. Get it from https://www.deepl.com/pro-api

2. Copy `.env.local.example` to `.env.local` and set your API key.

```bash
cp .env.local.example .env.local
```

3. Set your API key to `.env.local`.

```bash:.env.local
DEEPL_API_KEY=YOUR_API_KEY
```

4. Install and run.

```bash
pnpm install
```

```bash
pnpm dev
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkimizuy%2Fnext-i18n-deepl-portfolio-template%2F&env=DEEPL_API_KEY)

