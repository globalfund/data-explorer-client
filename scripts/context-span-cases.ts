// Mirrors data-explorer.server test/context-span-mutations.js.
type Mutation = (span: any, claim: any, data: any) => void;

export const contextSpanMutations: [string, Mutation][] = [
  ["missing text", (span) => delete span.text],
  ["empty text", (span) => (span.text = "")],
  ["blank text", (span) => (span.text = "   ")],
  ["non-string text", (span) => (span.text = 123)],
  ["text not in claim", (span) => (span.text = "Text absent from the claim")],
  ["extra keys", (span) => (span.extra = true)],
  ["missing evidence ids", (span) => delete span.evidence_ids],
  ["empty evidence ids", (span) => (span.evidence_ids = [])],
  ["string evidence ids", (span) => (span.evidence_ids = span.evidence_ids[0])],
  ["non-string id", (span) => (span.evidence_ids = [123])],
  [
    "duplicate ids",
    (span) =>
      (span.evidence_ids = [span.evidence_ids[0], span.evidence_ids[0]]),
  ],
  [
    "id not cited by the claim",
    (span, _claim, data) => {
      const source = data.sources.find(
        (item: any) => item.kind === "external_context",
      );
      const extra = { ...source, id: `${source.id}.uncited` };
      data.sources.push(extra);
      span.evidence_ids = [extra.id];
    },
  ],
  [
    "id of a non-context source",
    (span, claim, data) =>
      (span.evidence_ids = [
        claim.evidence_ids.find(
          (id: string) =>
            data.sources.find((source: any) => source.id === id).kind !==
            "external_context",
        ),
      ]),
  ],
  ["unknown id", (span) => (span.evidence_ids = ["context.moz.unknown"])],
  ["non-object span", (_span, claim) => (claim.context_spans = ["text"])],
  [
    "non-array value",
    (_span, claim) => (claim.context_spans = claim.context_spans[0]),
  ],
  ["null value", (_span, claim) => (claim.context_spans = null)],
  ["empty array", (_span, claim) => (claim.context_spans = [])],
];

export const contextClaim = (data: any) =>
  data.sections
    .flatMap((section: any) => section.claims)
    .find((claim: any) => claim.context_spans);
