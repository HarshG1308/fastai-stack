# fastai-stack website

Marketing site and interactive docs for fastai-stack, built with Next.js and optimized for Vercel.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open http://localhost:3000

## Production checks

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Import this repository into Vercel.
2. Set Root Directory to website.
3. Framework Preset: Next.js.
4. Build Command: npm run build.
5. Output setting: default Next.js output.
6. Deploy.

## Domain setup: fastai-stack.dev

1. Open Vercel project settings and go to Domains.
2. Add fastai-stack.dev and www.fastai-stack.dev.
3. Create DNS records in your registrar exactly as Vercel suggests.
4. Set fastai-stack.dev as primary.

## Main routes

- /
- /docs
