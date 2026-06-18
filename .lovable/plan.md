## Goal
Automate Google Search Console verification for `noyisafrica.com` using the connector (Option A), then submit the sitemap.

## Steps

1. **Link the Google Search Console connector**
   - Prompt the user to connect their Google account via the connector UI.
   - Once linked, the connector secrets become available to the project.

2. **Request a verification token**
   - Call the Google Site Verification API via the connector gateway to get a `google-site-verification` meta token for `https://noyisafrica.com/`.

3. **Inject the meta tag**
   - Add `<meta name="google-site-verification" content="<token>" />` to the `<head>` of `src/routes/__root.tsx` so it appears on every page.

4. **Verify the site**
   - Call the Site Verification API again via the connector gateway to tell Google to verify the meta tag.

5. **Add the property to Search Console**
   - Call the Search Console API via the connector gateway to add `https://noyisafrica.com/` as a managed property.

6. **Submit the sitemap**
   - Submit `https://noyisafrica.com/sitemap.xml` to Search Console via the connector gateway.

## Google Business Profile (already claimed)

There is no additional code integration needed. Since you already claimed the profile at **Lower Nevis Street, St. John's** and added `https://noyisafrica.com` as the website URL, Google already links the two. The `LocalBusiness` JSON-LD structured data on every page mirrors the same address and phone number, which helps Google cross-reference and display the profile in local/map results. Just make sure the website field in your GBP dashboard is exactly `https://noyisafrica.com`.

## What you need to do

- Approve the connector link when prompted (Step 1). The rest is handled automatically by the agent.