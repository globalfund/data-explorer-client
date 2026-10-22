/// <reference types="cypress" />

type CountryOptions = {
  isDonor?: boolean;
  hasResults?: boolean;
  hasResultDocuments?: boolean;
};

const apiUrl = "http://api.test";
const cmsUrl = "http://cms.test";
const realMozambiqueBundle = "tests/fixtures/country-bundle-moz.json";
const contextMozambiqueBundle =
  "tests/fixtures/country-bundle-moz-context.json";
// Set only by cypress.narratives-web-context.config.ts, whose Vite instance runs with the flag.
const highlightWebContext = Cypress.expose("highlight_web_context") === true;
const countryNames: Record<string, string> = {
  KEN: "Kenya",
  MOZ: "Mozambique",
  NRU: "Nauru",
  TLS: "Timor-Leste",
  USA: "United States",
};

const countryCodeFromUrl = (url: URL) =>
  url.pathname.match(/\/location\/([A-Z]{3})\/info/)?.[1] ||
  url.pathname.match(/\/results\/table\/([A-Z]{3})\//)?.[1] ||
  url.searchParams.get("geographies") ||
  "MOZ";

const stubCountryPage = (countries: Record<string, CountryOptions> = {}) => {
  cy.intercept("GET", `${cmsUrl}/**`, {
    statusCode: 200,
    body: { data: [] },
  }).as("cms");

  cy.intercept("GET", `${apiUrl}/**`, (request) => {
    const url = new URL(request.url);
    const code = countryCodeFromUrl(url);
    const options = countries[code] || {};

    if (/\/location\/[A-Z]{3}\/info$/.test(url.pathname)) {
      request.reply({
        count: 1,
        data: [
          {
            name: countryNames[code] || code,
            region: "Test region",
            description: "Existing country content",
            isDonor: options.isDonor ?? false,
            FPMName: "Test Portfolio Manager",
            FPMEmail: "portfolio@example.org",
            currentPrincipalRecipients: [],
            formerPrincipalRecipients: [],
          },
        ],
      });
      return;
    }
    if (url.pathname.includes("/location/coordinating-mechanism/")) {
      request.reply({ count: 0, data: [] });
      return;
    }
    if (url.pathname.includes("/results/table/")) {
      request.reply({
        count: options.hasResults ? 1 : 0,
        data: options.hasResults
          ? [{ id: "result-1", indicator: "Existing annual result" }]
          : [],
      });
      return;
    }
    if (url.pathname === "/documents") {
      const resultDocuments = url.searchParams.get("types") === "Profile";
      request.reply({
        count: resultDocuments && options.hasResultDocuments ? 1 : 0,
        data:
          resultDocuments && options.hasResultDocuments
            ? [{ id: "document-1", title: "Existing results document" }]
            : [],
      });
      return;
    }
    if (
      url.pathname === "/allocations/cycles" ||
      url.pathname === "/funding-requests/cycles"
    ) {
      request.reply({
        count: 2,
        data: [
          { name: "2023 - 2025", value: "2023 - 2025" },
          { name: "2026 - 2028", value: "2026 - 2028" },
        ],
      });
      return;
    }
    if (url.pathname.endsWith("/cycles")) {
      request.reply({
        count: 2,
        data: [
          { name: "Grant Cycle 6", value: "Grant Cycle 6" },
          { name: "Grant Cycle 7", value: "Grant Cycle 7" },
        ],
      });
      return;
    }
    if (url.pathname.match(/^\/allocations\/radial\/[A-Z]{3}$/)) {
      request.reply({
        count: 1,
        data: [{ name: "HIV", value: 446058953 }],
      });
      return;
    }
    if (url.pathname.includes("/disbursements/line-chart/")) {
      request.reply({
        count: 1,
        data: [{ name: "HIV", data: [100] }],
        xAxisKeys: ["2024"],
      });
      return;
    }
    request.reply({ count: 0, data: [], stats: [] });
  }).as("dataApi");
};

const stubNarrativeFixture = (country: string, fixture: string) => {
  cy.intercept("GET", `${apiUrl}/location/${country}/narratives?locale=en`, {
    fixture,
  }).as(`narrative${country}`);
};

const stubRealMozambiqueBundle = () => {
  cy.readFile(realMozambiqueBundle).then((bundle) => {
    cy.intercept(
      "GET",
      `${apiUrl}/location/MOZ/narratives?locale=en`,
      bundle,
    ).as("narrativeMOZ");
  });
};

const visitCountry = (country: string, tab: string) => {
  cy.visit(`/location/${country}/${tab}`);
};

type ContextClaim = {
  text: string;
  evidence_ids: string[];
  context_spans?: { text: string; evidence_ids: string[] }[];
};
type ContextBundle = {
  sources: {
    id: string;
    kind: string;
    source_url?: string | null;
    document_locator?: { title: string; location: string } | null;
  }[];
  sections: { id: string; claims: ContextClaim[] }[];
  overview: { claims: ContextClaim[] };
};

const expectWebContext = (
  bundle: ContextBundle,
  claim: ContextClaim,
  sectionTitle: string,
) => {
  cy.contains('[data-cy="narrative-section"]', sectionTitle)
    .should("be.visible")
    .find('[data-cy="narrative-claim"] > p')
    .filter((_index, paragraph) => paragraph.textContent === claim.text)
    .should("have.length", 1)
    .then(($paragraph) => {
      expect($paragraph.text()).to.equal(claim.text);
      expect($paragraph[0].scrollWidth).to.be.at.most(
        $paragraph[0].clientWidth,
      );
      const marks = $paragraph.find("mark");
      if (!highlightWebContext) {
        expect(marks).to.have.length(0);
        expect($paragraph.children()).to.have.length(0);
        return;
      }
      const spans = claim.context_spans!;
      expect(marks).to.have.length(spans.length);
      spans.forEach((span, index) => {
        const mark = marks.eq(index);
        const sources = span.evidence_ids.map((id) =>
          bundle.sources.find((source) => source.id === id),
        );
        const label = `Web context: ${sources
          .map(
            (source) =>
              `${source!.document_locator!.title}, ${source!.document_locator!.location}`,
          )
          .join("; ")}`;
        expect(mark.text()).to.equal(span.text);
        expect(mark.attr("title")).to.equal(label);
        expect(mark.attr("data-context-label")).to.equal(label);
        expect(mark.css("background-color")).to.equal("rgb(255, 241, 184)");
        expect(
          mark[0].ownerDocument.defaultView!.getComputedStyle(
            mark[0],
            "::before",
          ).content,
        ).not.to.equal("none");
        expect(mark.find("a")).to.have.length(0);
        const paragraphBox = $paragraph[0].getBoundingClientRect();
        for (const rect of Array.from(mark[0].getClientRects())) {
          expect(rect.left).to.be.at.least(paragraphBox.left - 1);
          expect(rect.right).to.be.at.most(paragraphBox.right + 1);
        }
      });
    })
    .parent()
    .find('[data-cy="narrative-sources"] a')
    .should("have.length.at.least", 1)
    .then(($links) => {
      const hrefs = $links.toArray().map((link) => link.getAttribute("href"));
      expect(new Set(hrefs).size).to.equal(hrefs.length);
      $links.each((_, link) =>
        expect(link.textContent).to.match(/^(?!Source \d)\S/),
      );
      (claim.context_spans ?? [])
        .flatMap((span) => span.evidence_ids)
        .forEach((id) =>
          expect(hrefs).to.include(
            bundle.sources.find((source) => source.id === id)!.source_url,
          ),
        );
    });
  cy.get("mark").should(
    "have.length",
    highlightWebContext ? claim.context_spans!.length : 0,
  );
};

describe(`web context highlight with the review flag ${highlightWebContext ? "on" : "off"}`, () => {
  beforeEach(() => {
    stubCountryPage({ MOZ: { hasResults: true } });
  });

  for (const [device, viewport] of [
    ["desktop", [1280, 900]],
    ["mobile", [375, 812]],
  ] as const) {
    it(`renders the fixture's Results and Overview spans on ${device}`, () => {
      cy.viewport(viewport[0], viewport[1]);
      cy.readFile(contextMozambiqueBundle).then((bundle: ContextBundle) => {
        cy.intercept(
          "GET",
          `${apiUrl}/location/MOZ/narratives?locale=en`,
          bundle,
        ).as("contextNarrativeMOZ");
        const results = bundle.sections
          .find((section) => section.id === "results.annual_results")!
          .claims.find((claim) => claim.context_spans)!;
        const overview = bundle.overview.claims.find(
          (claim) => claim.context_spans,
        )!;
        expect(results, "Results span claim").to.exist;
        expect(overview, "Overview span claim").to.exist;

        visitCountry("MOZ", "results");
        cy.wait("@contextNarrativeMOZ");
        expectWebContext(bundle, results, "Annual results");
        cy.contains(
          '[data-cy="narrative-claim"]',
          results.text.slice(0, 40),
        ).scrollIntoView({ offset: { top: -300, left: 0 } });
        cy.screenshot(
          `web-context-results-${device}-${highlightWebContext ? "on" : "off"}`,
          { capture: "viewport" },
        );

        visitCountry("MOZ", "overview");
        cy.wait("@contextNarrativeMOZ");
        expectWebContext(bundle, overview, "Country overview");
      });
    });
  }

  it("leaves bundles without spans unchanged", () => {
    stubRealMozambiqueBundle();
    for (const tab of ["overview", "results"]) {
      visitCountry("MOZ", tab);
      cy.wait("@narrativeMOZ");
      cy.get('[data-cy="narrative-claim"] > p').should(
        "have.length.at.least",
        1,
      );
      cy.get("mark").should("not.exist");
    }
    stubNarrativeFixture("KEN", "narratives/recipient.json");
    visitCountry("KEN", "access-to-funding");
    cy.wait("@narrativeKEN");
    cy.contains('[data-cy="narrative-section"]', "Application context").should(
      "be.visible",
    );
    cy.get("mark").should("not.exist");
  });
});

describe("country narratives with the rollout flag enabled", () => {
  beforeEach(() => {
    stubCountryPage({
      MOZ: { hasResults: true },
      USA: { isDonor: true },
      TLS: { hasResultDocuments: true },
    });
  });

  it("loads an actual generated contract and preserves existing Overview content", () => {
    stubRealMozambiqueBundle();
    visitCountry("MOZ", "overview");
    cy.wait("@narrativeMOZ");
    cy.contains("h1", "Mozambique").should("be.visible");
    cy.contains("Fund Portfolio Manager").should("be.visible");
    cy.contains('[data-cy="narrative-section"]', "Country overview")
      .should("be.visible")
      .and("contain", "Available topics: Allocations")
      .and("contain", "default view");
    cy.get('[data-cy="narrative-section"] ol').should("not.exist");
    cy.get('[data-cy="narrative-claim"] > p')
      .should("have.length.at.least", 1)
      .each(($paragraph) => {
        cy.wrap($paragraph).find("a").should("not.exist");
        cy.wrap($paragraph)
          .parent()
          .find('[data-cy="narrative-sources"]')
          .should("exist")
          .within(() => {
            cy.get("a").then(($links) => {
              const hrefs = $links
                .toArray()
                .map((link) => link.getAttribute("href"));
              expect(new Set(hrefs).size).to.equal(hrefs.length);
              $links.each((_, link) =>
                expect(link.textContent).to.match(/^(?!Source \d)\S/),
              );
            });
            cy.contains("Sources:").should("not.exist");
          });
      });
  });

  it("renders one semantic heading per contiguous paragraph heading group", () => {
    cy.readFile(realMozambiqueBundle).then((bundle) => {
      const sourceClaim = bundle.overview.claims[0];
      bundle.overview.claims = [
        { ...sourceClaim, heading: "Progress" },
        { ...sourceClaim, heading: "Progress" },
        { ...sourceClaim, heading: null },
        { ...sourceClaim, heading: "Challenges" },
        { ...sourceClaim, heading: "Challenges" },
      ];
      const allocation = bundle.sections.find(
        (section) => section.id === "access_to_funding.allocations",
      );
      if (!allocation) throw new Error("MOZ allocation narrative is missing");
      allocation.claims[0].heading = "Progress";
      cy.intercept(
        "GET",
        `${apiUrl}/location/MOZ/narratives?locale=en`,
        bundle,
      ).as("headedNarrativeMOZ");
    });
    visitCountry("MOZ", "overview");
    cy.wait("@headedNarrativeMOZ");
    cy.get('[data-cy="narrative-heading"]').should("have.length", 2);
    cy.get('[data-cy="narrative-heading"]')
      .first()
      .should("have.prop", "tagName", "H3")
      .and("have.text", "Progress");
    cy.get('[data-cy="narrative-heading"]')
      .last()
      .should("have.prop", "tagName", "H3")
      .and("have.text", "Challenges");
    cy.get('[data-cy="narrative-claim"] > p').should("have.length", 5);
    cy.get('[data-cy="narrative-claim"]').each(($claim) => {
      cy.wrap($claim).find('[data-cy="narrative-sources"]').should("exist");
    });

    visitCountry("MOZ", "access-to-funding");
    cy.wait("@headedNarrativeMOZ");
    cy.get('[data-cy="narrative-heading"]').should("not.exist");
    cy.contains('[data-cy="narrative-section"]', "Allocations").should(
      "be.visible",
    );
    cy.get('[data-cy="narrative-claim"] > p').should("have.length.at.least", 1);
    cy.get('[data-cy="narrative-claim"] [data-cy="narrative-sources"]')
      .should("exist")
      .find("a")
      .first()
      .invoke("text")
      .should("match", /^(?!Source \d)\S/);
  });

  it("renders mapped narratives across every applicable country tab", () => {
    stubRealMozambiqueBundle();
    const placements = [
      ["overview", "Country overview"],
      ["access-to-funding", "Allocations"],
      ["access-to-funding", "Funding requests"],
      ["access-to-funding", "Eligibility"],
      ["financial-insights", "Disbursements"],
      ["financial-insights", "Budgets"],
      ["financial-insights", "Expenditure"],
      ["financial-insights", "Grants"],
      ["results", "Annual results"],
    ] as const;
    for (const [tab, title] of placements) {
      visitCountry("MOZ", tab);
      cy.wait("@narrativeMOZ");
      cy.contains('[data-cy="narrative-section"]', title).should("be.visible");
    }
    visitCountry("MOZ", "access-to-funding");
    cy.wait("@narrativeMOZ");
    cy.get('[data-cy="narrative-unavailable"]')
      .should("contain", "not enough supporting evidence")
      .and("be.visible");

    stubNarrativeFixture("USA", "narratives/donor.json");
    visitCountry("USA", "resource-mobilization");
    cy.wait("@narrativeUSA");
    cy.contains('[data-cy="narrative-section"]', "Pledges and contributions")
      .should("be.visible")
      .and("contain", "saved default view");

    stubNarrativeFixture("KEN", "narratives/recipient.json");
    visitCountry("KEN", "access-to-funding");
    cy.wait("@narrativeKEN");
    cy.contains('[data-cy="narrative-section"]', "Application context").should(
      "be.visible",
    );

    stubNarrativeFixture("TLS", "narratives/document-only-results.json");
    visitCountry("TLS", "results");
    cy.wait("@narrativeTLS");
    cy.contains('[data-cy="narrative-section"]', "Results context").should(
      "be.visible",
    );
  });

  it("shows loading, missing-content, service-error, and invalid-contract states without blocking the page", () => {
    cy.intercept(
      "GET",
      `${apiUrl}/location/MOZ/narratives?locale=en`,
      (request) => {
        request.on("response", (response) => response.setDelay(800));
        request.reply({ statusCode: 404, body: {} });
      },
    ).as("missingNarrative");
    visitCountry("MOZ", "overview");
    cy.get('[data-cy="narrative-loading"]').should("be.visible");
    cy.wait("@missingNarrative");
    cy.get('[data-cy="narrative-not_found"]')
      .should("contain", "No saved narrative")
      .and("be.visible");
    cy.contains("Fund Portfolio Manager").should("be.visible");

    cy.intercept("GET", `${apiUrl}/location/KEN/narratives?locale=en`, {
      statusCode: 503,
      body: { error: "private upstream detail" },
    }).as("failedNarrative");
    visitCountry("KEN", "overview");
    cy.wait("@failedNarrative");
    cy.get('[data-cy="narrative-error"]')
      .should("contain", "temporarily unavailable")
      .and("not.contain", "private upstream detail");
    cy.contains("Fund Portfolio Manager").should("be.visible");

    cy.readFile(realMozambiqueBundle).then((bundle) => {
      bundle.sources[0].source_url = "javascript:alert(1)";
      cy.intercept(
        "GET",
        `${apiUrl}/location/MOZ/narratives?locale=en`,
        bundle,
      ).as("unsafeNarrative");
    });
    visitCountry("MOZ", "overview");
    cy.wait("@unsafeNarrative");
    cy.get('[data-cy="narrative-error"]')
      .should("contain", "temporarily unavailable")
      .and("be.visible");
    cy.get('a[href^="javascript:"]').should("not.exist");
  });

  it("ignores a stale response after in-app country navigation", () => {
    cy.readFile(realMozambiqueBundle).then((bundle) => {
      cy.intercept(
        "GET",
        `${apiUrl}/location/MOZ/narratives?locale=en`,
        (request) => {
          request.on("response", (response) => response.setDelay(1200));
          request.reply(bundle);
        },
      ).as("slowMozambiqueNarrative");
    });
    stubNarrativeFixture("KEN", "narratives/recipient.json");
    visitCountry("MOZ", "overview");
    cy.get('[data-cy="narrative-loading"]').should("be.visible");
    cy.window().then((win) => {
      win.history.pushState({}, "", "/location/KEN/access-to-funding");
      win.dispatchEvent(new PopStateEvent("popstate"));
    });
    cy.wait("@narrativeKEN");
    cy.url().should("include", "/location/KEN/access-to-funding");
    cy.get('[data-cy="narrative-unavailable"]')
      .should("contain", "not enough supporting evidence")
      .and("be.visible");
    cy.wait("@slowMozambiqueNarrative");
    cy.get("body").should("not.contain", "In MOZ, allocation");
  });

  it("renders claim text as text and exposes safe citations to the keyboard", () => {
    cy.readFile(realMozambiqueBundle).then((bundle) => {
      bundle.overview.claims[0].text =
        '<img src=x onerror="document.body.dataset.unsafe=1"> Saved claim';
      cy.intercept(
        "GET",
        `${apiUrl}/location/MOZ/narratives?locale=en`,
        bundle,
      ).as("safeNarrative");
    });
    visitCountry("MOZ", "overview");
    cy.wait("@safeNarrative");
    cy.contains(
      '<img src=x onerror="document.body.dataset.unsafe=1"> Saved claim',
    )
      .should("be.visible")
      .and("have.prop", "tagName", "P");
    cy.get("body").should("not.have.attr", "data-unsafe");
    cy.get('[aria-label^="Source: "]')
      .first()
      .should("have.attr", "href")
      .and("match", /^https:\/\//);
    cy.get('[aria-label^="Source: "]')
      .first()
      .focus()
      .should("have.focus")
      .and("have.attr", "rel", "noreferrer");
  });

  it("shows each linkable source once by name and keeps its locations on the link", () => {
    cy.readFile(realMozambiqueBundle).then((bundle) => {
      const linked = bundle.sources[0];
      linked.document_locator = {
        title: "Linked source title",
        location: "Paragraph 4",
      };
      const repeated = {
        ...linked,
        id: "document.repeated-test-source",
        document_locator: {
          title: "Linked source title",
          location: "Paragraph 5",
        },
        content_hash: "b".repeat(64),
      };
      const route = {
        ...linked,
        id: "structured.route-test-source",
        source_url: "https://example.org/new-route/2024",
        document_locator: null,
        content_hash: "c".repeat(64),
      };
      const unlinked = {
        ...linked,
        id: "document.unlinked-test-source",
        kind: "document",
        source_url: null,
        document_locator: {
          title: "Unlinked source title",
          location: "Paragraph 2",
        },
        content_hash: "a".repeat(64),
        excerpt: "A supporting document excerpt.",
      };
      bundle.sources.push(repeated, route, unlinked);
      const allocations = bundle.sections.find(
        (section) => section.id === "access_to_funding.allocations",
      );
      if (!allocations) throw new Error("MOZ allocations narrative is missing");
      allocations.claims[0].evidence_ids = [
        unlinked.id,
        linked.id,
        repeated.id,
        route.id,
      ];
      cy.intercept(
        "GET",
        `${apiUrl}/location/MOZ/narratives?locale=en`,
        bundle,
      ).as("filteredCitations");
    });
    visitCountry("MOZ", "access-to-funding");
    cy.wait("@filteredCitations");
    cy.get('[data-cy="narrative-claim"]')
      .first()
      .within(() => {
        cy.get('[data-cy="narrative-sources"] a').should("have.length", 2);
        cy.get('[data-cy="narrative-sources"] a')
          .first()
          .should("have.text", "Linked source title")
          .and(
            "have.attr",
            "title",
            "Linked source title - Paragraph 4, Paragraph 5",
          );
        cy.get('[data-cy="narrative-sources"] a')
          .last()
          .should("have.text", "New route data, 2024")
          .and("have.attr", "href", "https://example.org/new-route/2024");
        cy.contains("Calculation:").should("not.exist");
      });
  });

  it("preserves country tab rules for recipients, donors, sparse countries, and document-only Results", () => {
    stubRealMozambiqueBundle();
    visitCountry("MOZ", "overview");
    cy.wait("@narrativeMOZ");
    cy.contains('[data-cy="page-tab-button"]', "Resource Mobilization").should(
      "not.exist",
    );
    cy.contains('[data-cy="page-tab-button"]', "Results").should("exist");

    stubNarrativeFixture("USA", "narratives/donor.json");
    visitCountry("USA", "overview");
    cy.wait("@narrativeUSA");
    cy.contains('[data-cy="page-tab-button"]', "Resource Mobilization").should(
      "exist",
    );
    cy.contains('[data-cy="page-tab-button"]', "Results").should("not.exist");

    stubNarrativeFixture("NRU", "narratives/sparse.json");
    visitCountry("NRU", "overview");
    cy.wait("@narrativeNRU");
    cy.contains('[data-cy="page-tab-button"]', "Resource Mobilization").should(
      "not.exist",
    );
    cy.contains('[data-cy="page-tab-button"]', "Results").should("not.exist");
    cy.get('[data-cy="narrative-section"]').should("not.exist");

    stubNarrativeFixture("TLS", "narratives/document-only-results.json");
    visitCountry("TLS", "overview");
    cy.wait("@narrativeTLS");
    cy.contains('[data-cy="page-tab-button"]', "Results").should("exist");
  });

  it("renders the Overview narrative at a mobile viewport", () => {
    cy.viewport("iphone-x");
    stubRealMozambiqueBundle();
    visitCountry("MOZ", "overview");
    cy.wait("@narrativeMOZ");
    cy.contains('[data-cy="narrative-section"]', "Country overview").should(
      "be.visible",
    );
    cy.get('[aria-label^="Source: "]').first().should("be.visible");
    cy.get('[data-cy="narrative-section"]').screenshot(
      "narrative-overview-mobile",
    );
  });

  it("keeps funding and financial filters functional and labels narratives as default-view content", () => {
    stubRealMozambiqueBundle();
    cy.intercept("GET", `${apiUrl}/allocations/radial/MOZ*`, (request) => {
      if (request.query.periods === "2023 - 2025") {
        request.alias = "filteredAllocation";
      }
      request.reply({
        count: 1,
        data: [{ name: "HIV", value: 446058953 }],
      });
    });
    cy.intercept("GET", `${apiUrl}/disbursements/line-chart/**`, (request) => {
      if (request.query.cycleNames === "Grant Cycle 6") {
        request.alias = "filteredDisbursement";
      }
      request.reply({
        count: 1,
        data: [{ name: "HIV", data: [100] }],
        xAxisKeys: ["2024"],
      });
    });

    visitCountry("MOZ", "access-to-funding");
    cy.wait("@narrativeMOZ");
    cy.get("#allocation")
      .contains('[data-cy="chart-cycle-button"]', "2023-2025")
      .should("be.enabled")
      .click();
    cy.wait("@filteredAllocation")
      .its("request.query.periods")
      .should("equal", "2023 - 2025");
    cy.contains('[data-cy="narrative-section"]', "Allocations")
      .should("contain", "default view")
      .and("be.visible");

    visitCountry("MOZ", "financial-insights");
    cy.wait("@narrativeMOZ");
    cy.contains('[data-cy="narrative-section"]', "Disbursements")
      .should("contain", "default view")
      .and("be.visible");
    cy.contains('[data-cy="chart-cycle-button"]', "Grant Cycle 6")
      .should("be.enabled")
      .click();
    cy.wait("@filteredDisbursement")
      .its("request.query.cycleNames")
      .should("equal", "Grant Cycle 6");
    cy.contains('[data-cy="narrative-section"]', "Disbursements")
      .should("contain", "default view")
      .and("be.visible");
  });
});
