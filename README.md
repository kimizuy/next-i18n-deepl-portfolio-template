This template makes it easy to create an internationalized portfolio site. Simply write your document in your native language and DeepL will automatically translate the document for you.

Does DeepL support your language? Check by following the link below:

https://www.deepl.com/docs-api/translate-text/translate-text

## Tech Stack
- Next.js
- DeepL Translate API
- TypeScript
- Tailwind CSS
- mdx-bundler

## Set DeepL API key (required)

Get your API key from https://www.deepl.com/pro-api

Copy `.env.local.example` to `.env.local` and set your API key.

```bash
cp .env.local.example .env.local
```

Set your API key to `.env.local`.

```bash:.env.local
DEEPL_API_KEY=YOUR_API_KEY
```

## Development

Install dependencies

```bash
npm install
```

Generate type predicates

```bash
npm run gen:type-predicates
```

Start development server

```bash
npm run dev
```

### Note

This template keeps type-safe using Type Predicates.

Execute `gen:type-predicates` when the contents of `src/utils/types.ts` or `src/utils/i18n-config.ts` have been changed.
