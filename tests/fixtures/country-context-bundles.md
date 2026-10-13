# Country context contract fixtures

`country-bundle-moz-context.json` (v1 country bundle) and `page-bundle-country-moz-context.json` (v2 page bundle, `country/MOZ/en/default`) are exact copies of `tests/fixtures/country_context/bundles/MOZ-country-bundle.json` and `MOZ-page-bundle.json` from the Narrative Engine repository at commit `13611e6`, copied on 2026-10-13.

SHA-256: `56aa0a118418e0249d9b41c7ae4f75ba487dff942afab3ae641c5b0dbcdbdb9e` (country, 42176 bytes) and `b701ec0bd5398a2a007e8ea207eb86fb3de69d6aaeea8124cd2c169ab5682faf` (page, 50355 bytes). Preserve serializer bytes.

The engine serialized them offline from its reference Mozambique snapshot, its packaged Mozambique context manifest and a mock provider. No network request or model call was made, and the prose is test output, not editorial content. Both bundles include two `external_context` sources and one Results claim with optional `context_spans`: an exact phrase of the claim text that cites one `external_context` source the claim also cites. One Overview (v2 summary) Challenges paragraph restates the same fact with its own `context_spans` entry. Every other claim omits the key.
