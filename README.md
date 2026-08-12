# AI Store

Next.js + Tailwind rebuild of the activation storefront, renamed to **AI Store**, with every product priced at **100 ج.م**.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

- `app/layout.tsx` — RTL Arabic root layout, page metadata
- `app/page.tsx` — product data, ticket-stub product cards, cart state
- `app/globals.css` — design tokens (colors, ticket-divider motif)
- `tailwind.config.ts` — color palette and font mappings

## Notes

- This environment had no network access, so the project wasn't `npm install`ed or build-verified here — do that on your machine before deploying.
- All 16 products carry the flat 100 ج.م price; edit the `PRODUCTS` array in `app/page.tsx` to change names, details, or prices per item.
. 
