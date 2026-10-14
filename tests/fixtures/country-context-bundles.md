# Country context contract fixtures

`country-bundle-moz-context.json` (v1 country bundle) and `page-bundle-country-moz-context.json` (v2 page bundle, `country/MOZ/en/default`) are exact copies of `tests/fixtures/country_context/bundles/MOZ-country-bundle.json` and `MOZ-page-bundle.json` from the Narrative Engine repository at commit `b84eab1`, copied on 2026-10-14.

SHA-256: `5ec5a5800d1a91faaa8e9143bf39548be6564de0400110cd7d219159f6d0993f` (country, 42841 bytes) and `76f09c6447f8a9e96f9d6b5cd277e214091319ef9e5f9a97221911c52000f92f` (page, 51020 bytes). Preserve serializer bytes.

The engine serialized them offline from its reference Mozambique snapshot, a Mozambique context test manifest with two events linked to the antiretroviral therapy finding and a mock provider. No network request or model call was made, and the prose is test output, not editorial content. Both bundles include two `external_context` sources and one Results context paragraph with optional `context_spans`: exact phrases of the claim text, each citing one `external_context` source the claim also cites. One Overview (v2 summary) paragraph without a heading states the antiretroviral therapy count with its structured source and restates the UNAIDS fact with its own `context_spans` entry. Every other claim omits the key.
