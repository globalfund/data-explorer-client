# Country context contract fixtures

`country-bundle-moz-context.json` (v1 country bundle) and `page-bundle-country-moz-context.json` (v2 page bundle, `country/MOZ/en/default`) are exact copies of `tests/fixtures/country_context/bundles/MOZ-country-bundle.json` and `MOZ-page-bundle.json` from the Narrative Engine repository at commit `075f3e3`, copied on 2026-10-13.

SHA-256: `8d6e5e03c530516e255830f778d71a62b1655f937145112578787e01b1e360ab` (country, 44302 bytes) and `ff4aa334f8833f7473fd4f4f7e58fcb41f07a17102c8b7ea7382f8dee4147fd7` (page, 52571 bytes). Preserve serializer bytes.

The engine serialized them offline from its reference Mozambique snapshot, its packaged Mozambique context manifest and a mock provider. No network request or model call was made, and the prose is test output, not editorial content. Both bundles include three `external_context` sources and one Results claim with optional `context_spans`: an exact phrase of the claim text that cites one `external_context` source the claim also cites. One Overview (v2 summary) Challenges paragraph restates the same fact with its own `context_spans` entry. Every other claim omits the key.
