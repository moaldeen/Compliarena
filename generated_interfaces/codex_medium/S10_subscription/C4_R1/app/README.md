# Aurea subscription interface

A self-contained React/Vite prototype of an Android photo editor subscription screen.

Run `npm install`, then `npm run dev`. Use `npm run build` to create a production build.

The yearly and monthly options update pricing and renewal disclosures. The hero toggles an original/edited preview. Closing the offer opens a free editor with an intensity slider and SVG download. Terms, privacy, restore purchases, and the subscription review all open working dialogs.

This is a UI prototype: no payment is processed and no subscription is created. A production Android application must integrate Google Play Billing, actual entitlement restoration, and its published legal policies. Prices are sample USD offers and should be replaced with localized prices from Google Play before release.

All artwork is local inline SVG; no network assets or external fonts are required.
