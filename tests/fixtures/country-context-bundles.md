# Country context contract fixtures

`country-bundle-moz-context.json` (v1 country bundle) and `page-bundle-country-moz-context.json` (v2 page bundle, `country/MOZ/en/default`) are exact copies of `tests/fixtures/country_context/bundles/MOZ-country-bundle.json` and `MOZ-page-bundle.json` from the Narrative Engine repository at commit `fbca520`, copied on 2026-10-13. They are byte-identical to the middleware fixtures `test/fixtures/country-bundle-moz-context.json` and `page-bundle-country-moz-context.json` (data-explorer.server commit `d8b105c`).

SHA-256: `499c8052aa36610275bdf6aad19c921e48872d63d1af6ce0b6574f17e64d5ab4` (country, 45374 bytes) and `48b1da39e6f91786ccd073e3a5db09e4cc4e421e3e36535e8554e4cb7a7881af` (page, 53823 bytes). Preserve serializer bytes.

The engine serialized them offline from its reference Mozambique snapshot, its packaged Mozambique context manifest and a mock provider. No network request or model call was made, and the prose is test output, not editorial content. Both bundles include five `external_context` sources and one Results claim and one Overview Challenges claim with optional `context_spans`: an exact phrase of the claim text that cites one `external_context` source the claim also cites. Every other claim omits the key, and the Overview cites no context.
