import { FeatureCollection, Feature } from "geojson";

import D2HACCENT from "app/assets/geo-map-pins/d2h_accent.png";
import D2HWHITE from "app/assets/geo-map-pins/d2h.png";
import AMFMACCENT from "app/assets/geo-map-pins/amfm_accent.png";
import AMFMWHITE from "app/assets/geo-map-pins/amfm.png";
import PRIVATEACCENT from "app/assets/geo-map-pins/private_accent.png";
import PRIVATEWHITE from "app/assets/geo-map-pins/private.png";
import MCACCENT from "app/assets/geo-map-pins/multicountry_accent.png";
import MCWHITE from "app/assets/geo-map-pins/multicountry.png";

export interface GeoMapPinMarker {
  id: string;
  code: string;
  geoName: string;
  latitude: number;
  longitude: number;
  amounts: {
    label: string;
    value: number;
  }[];
  subType: string;
  d2hCoordinates: number[][] | null;
  intId: number;
}

export interface InvestmentsGeoMapPinMarker {
  id: string;
  code: string;
  geoName: string;
  latitude: number;
  longitude: number;
  components: {
    name: string;
    activitiesCount: number;
    value: number;
  }[];
  disbursed: number;
  committed: number;
  signed: number;
}

export interface AllocationsGeoMapPinMarker {
  id: string;
  code: string;
  geoName: string;
  latitude: number;
  longitude: number;
  components: {
    name: string;
    value: number;
  }[];
  value: number;
}

export interface GeoMapProps {
  data: FeatureCollection;
  pins: GeoMapPinMarker[];
  investmentsPins: InvestmentsGeoMapPinMarker[];
  allocationsPins: AllocationsGeoMapPinMarker[];
  type: "investments" | "donors" | "allocations" | "budgets";
  investmentSubType?: "Disbursed" | "Signed" | "Committed";
  allowClickthrough?: boolean;
  noData: boolean;
  clickthroughPath?: string;
}

export const mapStyle = {
  version: 8,
  name: "Blank",
  metadata: {
    "mapbox:autocomposite": true,
    "mapbox:type": "template",
    "mapbox:sdk-support": {
      android: "9.3.0",
      ios: "5.10.0",
      js: "2.0.0",
    },
    "mapbox:groups": {
      "Land, water, & sky, land": { name: "Land, water, & sky, land" },
      "Land, water, & sky, water": { name: "Land, water, & sky, water" },
      "Land, water, & sky, built": {
        name: "Land, water, & sky, built",
        collapsed: true,
      },
      "Administrative boundaries, admin": {
        name: "Administrative boundaries, admin",
      },
      "Land, water, & sky, sky": { name: "Land, water, & sky, sky" },
    },
    "mapbox:decompiler": {
      id: "ckocvhc632gc617qpv7dikgms",
      strata: [
        {
          id: "ckocvhc632gc617qpv7dikgms",
          order: [
            ["land-and-water", "land"],
            ["land-and-water", "water"],
            ["land-and-water", "built"],
            ["admin-boundaries", "admin"],
            ["land-and-water", "sky"],
          ],
        },
      ],
      overrides: {
        "admin-boundaries": {
          "admin-0-boundary-disputed": {
            paint: { "line-width": 1, "line-color": "#fff" },
          },
          "admin-0-boundary": {
            paint: { "line-width": 1, "line-color": "#fff" },
          },
          "admin-0-boundary-bg": {
            paint: { "line-color": "#fff", "line-width": 1 },
          },
        },
        "land-and-water": {
          "land-structure-line": {
            paint: {
              "line-color": "hsl(204, 10%, 80%)",
              "line-width": 2,
            },
            layout: { visibility: "none" },
          },
          "land-structure-polygon": {
            paint: {
              "fill-color": "hsl(204, 10%, 80%)",
              "fill-outline-color": "#fff",
            },
            layout: { visibility: "none" },
          },
          water: {
            paint: {
              "fill-color": "hsl(204, 0%, 100%)",
              "fill-outline-color": "#fff",
            },
          },
          "national-park": { layout: { visibility: "none" } },
          landuse: { layout: { visibility: "none" } },
          landcover: { layout: { visibility: "none" } },
          land: {
            paint: { "background-color": "hsl(204, 0%, 100%)" },
          },
          waterway: { layout: { visibility: "none" } },
        },
      },
      components: {
        "admin-boundaries": "9.0.0",
        "land-and-water": "9.0.0",
      },
      propConfig: {
        "admin-boundaries": {
          admin1: false,
          admin0DisputedDashPattern: "Dash",
          admin0Width: 1.1,
          "color-base": "hsl(204, 0%, 100%)",
        },
        "land-and-water": {
          "color-base": "hsl(204, 0%, 100%)",
          land: "Simple",
          transitionLandOnZoom: false,
          sky: false,
          waterStyle: "Simple",
        },
      },
    },
    "mapbox:uiParadigm": "layers",
  },
  center: [56.53803705011214, 21.812105560528906],
  zoom: 1.757277327608789,
  bearing: 0,
  pitch: 0,
  sources: {
    composite: {
      url: "mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2",
      type: "vector",
    },
  },
  sprite:
    "mapbox://sprites/zimmerman2014/ckocvhc632gc617qpv7dikgms/98xfr1yvnz7d1lvyse6ny4ca6",
  glyphs: "mapbox://fonts/zimmerman2014/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "land",
      type: "background",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, land",
      },
      layout: {},
      paint: { "background-color": "hsl(204, 0%, 100%)" },
    },
    {
      id: "landcover",
      type: "fill",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, land",
      },
      source: "composite",
      "source-layer": "landcover",
      maxzoom: 7,
      layout: { visibility: "none" },
      paint: {
        "fill-color": "hsl(204, 0%, 96%)",
        "fill-opacity": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          2,
          0.3,
          7,
          0,
        ],
        "fill-antialias": false,
      },
    },
    {
      id: "national-park",
      type: "fill",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, land",
      },
      source: "composite",
      "source-layer": "landuse_overlay",
      minzoom: 5,
      filter: ["==", ["get", "class"], "national_park"],
      layout: { visibility: "none" },
      paint: {
        "fill-color": "hsl(204, 2%, 94%)",
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          0,
          6,
          0.5,
          10,
          0.5,
        ],
      },
    },
    {
      id: "landuse",
      type: "fill",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, land",
      },
      source: "composite",
      "source-layer": "landuse",
      minzoom: 5,
      filter: [
        "match",
        ["get", "class"],
        ["park", "airport", "glacier", "pitch", "sand", "facility"],
        true,
        false,
      ],
      layout: { visibility: "none" },
      paint: {
        "fill-color": "hsl(204, 2%, 94%)",
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          0,
          6,
          ["match", ["get", "class"], "glacier", 0.5, 1],
        ],
      },
    },
    {
      id: "waterway",
      type: "line",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, water",
      },
      source: "composite",
      "source-layer": "waterway",
      minzoom: 8,
      layout: {
        "line-cap": ["step", ["zoom"], "butt", 11, "round"],
        "line-join": "round",
        visibility: "none",
      },
      paint: {
        "line-color": "hsl(204, 0%, 88%)",
        "line-width": [
          "interpolate",
          ["exponential", 1.3],
          ["zoom"],
          9,
          ["match", ["get", "class"], ["canal", "river"], 0.1, 0],
          20,
          ["match", ["get", "class"], ["canal", "river"], 8, 3],
        ],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0, 8.5, 1],
      },
    },
    {
      id: "water",
      type: "fill",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, water",
      },
      source: "composite",
      "source-layer": "water",
      layout: {},
      paint: {
        "fill-color": "hsl(204, 0%, 100%)",
        "fill-outline-color": "#fff",
      },
    },
    {
      id: "land-structure-polygon",
      type: "fill",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, built",
      },
      source: "composite",
      "source-layer": "structure",
      minzoom: 13,
      filter: [
        "all",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["get", "class"], "land"],
      ],
      layout: { visibility: "none" },
      paint: {
        "fill-color": "hsl(204, 10%, 80%)",
        "fill-outline-color": "#fff",
      },
    },
    {
      id: "land-structure-line",
      type: "line",
      metadata: {
        "mapbox:featureComponent": "land-and-water",
        "mapbox:group": "Land, water, & sky, built",
      },
      source: "composite",
      "source-layer": "structure",
      minzoom: 13,
      filter: [
        "all",
        ["==", ["geometry-type"], "LineString"],
        ["==", ["get", "class"], "land"],
      ],
      layout: { "line-cap": "round", visibility: "none" },
      paint: { "line-width": 2, "line-color": "hsl(204, 10%, 80%)" },
    },
    {
      id: "admin-0-boundary-bg",
      type: "line",
      metadata: {
        "mapbox:featureComponent": "admin-boundaries",
        "mapbox:group": "Administrative boundaries, admin",
      },
      source: "composite",
      "source-layer": "admin",
      minzoom: 1,
      filter: [
        "all",
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "US"], true, false],
      ],
      layout: {},
      paint: {
        "line-color": "#fff",
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 3, 0, 4, 0.5],
        "line-blur": ["interpolate", ["linear"], ["zoom"], 3, 0, 10, 2.2],
      },
    },
    {
      id: "admin-0-boundary",
      type: "line",
      metadata: {
        "mapbox:featureComponent": "admin-boundaries",
        "mapbox:group": "Administrative boundaries, admin",
      },
      source: "composite",
      "source-layer": "admin",
      minzoom: 1,
      filter: [
        "all",
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "disputed"], "false"],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "US"], true, false],
      ],
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#fff", "line-dasharray": [10, 0] },
    },
    {
      id: "admin-0-boundary-disputed",
      type: "line",
      metadata: {
        "mapbox:featureComponent": "admin-boundaries",
        "mapbox:group": "Administrative boundaries, admin",
      },
      source: "composite",
      "source-layer": "admin",
      minzoom: 1,
      filter: [
        "all",
        ["==", ["get", "disputed"], "true"],
        ["==", ["get", "admin_level"], 0],
        ["==", ["get", "maritime"], "false"],
        ["match", ["get", "worldview"], ["all", "US"], true, false],
      ],
      layout: { "line-join": "round" },
      paint: {
        "line-color": "#fff",
        "line-dasharray": [
          "step",
          ["zoom"],
          ["literal", [3.25, 3.25]],
          6,
          ["literal", [2.5, 2.5]],
          7,
          ["literal", [2, 2.25]],
          8,
          ["literal", [1.75, 2]],
        ],
      },
    },
  ],
  created: "2021-05-06T12:35:29.133Z",
  modified: "2021-05-06T12:52:53.848Z",
  id: "ckocvhc632gc617qpv7dikgms",
  owner: "zimmerman2014",
  visibility: "private",
  draft: false,
};

export function getRandomCountryData(
  setter: (v: FeatureCollection) => void
): void {
  fetch("/static/custom.geo.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((data: FeatureCollection) => {
      setter({
        type: "FeatureCollection",
        features: data.features.map((item: Feature, index: number) => {
          const value = index % 4 !== 0 ? Math.random() * 13 : 0;
          return {
            ...item,
            properties: {
              ...item.properties,
              value,
              data:
                value > 0
                  ? {
                      components: [
                        {
                          name: "HIV",
                          activitiesCount: 1,
                          value: 1000000000,
                        },
                      ],
                      disbursed: 1000000000,
                      committed: 1000000000,
                      signed: 1000000000,
                    }
                  : {},
            },
          };
        }),
      });
    });
}

export interface GeomapTooltipProps {
  name: string;
  data: {
    components: {
      name: string;
      activitiesCount: number;
      value: number;
    }[];
    disbursed: number;
    committed: number;
    signed: number;
  };
  investmentSubType?: "Disbursed" | "Signed" | "Committed";
}

export interface GeomapAllocationsTooltipProps {
  valueLabel: string;
  name: string;
  data: {
    components: {
      name: string;
      value: number;
    }[];
    value: number;
  };
}

export function getMapPinIcons(type: string) {
  switch (type) {
    case "Affordable Medicines Facility - malaria (AMFm)":
      return {
        activeImgSrc: AMFMACCENT,
        inactiveImgSrc: AMFMWHITE,
      };
    case "Debt2Health":
      return {
        activeImgSrc: D2HACCENT,
        inactiveImgSrc: D2HWHITE,
      };
    case "Private Sector & Nongovernment":
      return {
        activeImgSrc: PRIVATEACCENT,
        inactiveImgSrc: PRIVATEWHITE,
      };
    case "Multicountry":
      return {
        activeImgSrc: MCACCENT,
        inactiveImgSrc: MCWHITE,
      };
    default:
      return {
        activeImgSrc: "",
        inactiveImgSrc: "",
      };
  }
}

export const donorPins: GeoMapPinMarker[] = [
  {
    code: "Bill & Melinda Gates Foundation",
    geoName: "Bill & Melinda Gates Foundation",
    id: "cb4fc4cd-5f80-439e-8a83-315c000cc5c1",
    latitude: 47.623829,
    longitude: -122.346145,
    amounts: [
      {
        label: "Pledge",
        value: 3002300348,
      },
      {
        label: "Contribution",
        value: 2492033681,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 1,
  },
  {
    code: "Debt2Health - Germany-Côte d'Ivoire",
    geoName: "Debt2Health - Germany-Côte d'Ivoire",
    id: "7fe8b3ee-0147-4c2a-b688-6214e46bb3b6",
    latitude: 51.1657,
    longitude: 10.4515,
    amounts: [
      {
        label: "Pledge",
        value: 12540097.18,
      },
      {
        label: "Contribution",
        value: 12540096.85,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [51.1657, 10.4515],
      [7.53999, -5.54708],
    ],
    intId: 2,
  },
  {
    code: "United Methodist Church",
    geoName: "United Methodist Church",
    id: "654ec1eb-ba69-49f6-a364-72999b019e94",
    latitude: 39.952227,
    longitude: -75.166781,
    amounts: [
      {
        label: "Pledge",
        value: 28000000,
      },
      {
        label: "Contribution",
        value: 23855897,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 3,
  },
  {
    code: "LMI (Lutheran Malaria Initiative)",
    geoName: "LMI (Lutheran Malaria Initiative)",
    id: "85561440-f038-4ba6-a7d1-2c0f4deeb098",
    latitude: 38.829415,
    longitude: -122.192981,
    amounts: [
      {
        label: "Pledge",
        value: 13500000,
      },
      {
        label: "Contribution",
        value: 1654957.39,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 4,
  },
  {
    code: "United Nations Foundation",
    geoName: "United Nations Foundation",
    id: "c060593d-422c-4d57-bc5d-0f2955084dfb",
    latitude: 38.905599,
    longitude: -77.037237,
    amounts: [
      {
        label: "Pledge",
        value: 9578310,
      },
      {
        label: "Contribution",
        value: 9578310,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 5,
  },
  {
    code: "Unitaid",
    geoName: "Unitaid",
    id: "a2461139-78f8-476a-bccd-9feb536cc439",
    latitude: 46.230342,
    longitude: 6.126383,
    amounts: [
      {
        label: "Pledge",
        value: 38691956,
      },
      {
        label: "Contribution",
        value: 38691956,
      },
    ],
    subType: "Public Sector",
    d2hCoordinates: null,
    intId: 6,
  },
  {
    code: "Product (RED)",
    geoName: "Product (RED)",
    id: "11c1872b-2a28-4975-9cd5-2181fc81ff6a",
    latitude: 40.753348,
    longitude: -73.992876,
    amounts: [
      {
        label: "Pledge",
        value: 350000000,
      },
      {
        label: "Contribution",
        value: 524446463,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 7,
  },
  {
    code: "Children's Investment Fund Foundation",
    geoName: "Children's Investment Fund Foundation",
    id: "c8e006a4-687d-4942-920b-3337a5fe0190",
    latitude: 51.51113,
    longitude: -0.141901,
    amounts: [
      {
        label: "Pledge",
        value: 35160057,
      },
      {
        label: "Contribution",
        value: 19114621,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 8,
  },
  {
    code: "European Commission",
    geoName: "European Commission",
    id: "31f4346b-a79b-44de-a874-461c22b2e750",
    latitude: 50.849752,
    longitude: 4.351356,
    amounts: [
      {
        label: "Pledge",
        value: 3276853508.8600006,
      },
      {
        label: "Contribution",
        value: 2683793978.1,
      },
    ],
    subType: "Public Sector",
    d2hCoordinates: null,
    intId: 9,
  },
  {
    code: "Chevron Corporation",
    geoName: "Chevron Corporation",
    id: "22dbb3b9-8baf-4878-869e-797048f290a6",
    latitude: 37.75896,
    longitude: -121.959078,
    amounts: [
      {
        label: "Pledge",
        value: 60004000,
      },
      {
        label: "Contribution",
        value: 60004000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 10,
  },
  {
    code: "Takeda Pharmaceutical",
    geoName: "Takeda Pharmaceutical",
    id: "4b10b2bc-4915-4519-9761-d480f080a182",
    latitude: 35.740133,
    longitude: 139.766977,
    amounts: [
      {
        label: "Pledge",
        value: 15024422.01,
      },
      {
        label: "Contribution",
        value: 13273711.929999998,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 11,
  },
  {
    code: "Gift from Africa",
    geoName: "Gift from Africa",
    id: "ebcaa941-07d7-43df-b6cc-d55f0c12f3a7",
    latitude: -1.944862,
    longitude: 30.064064,
    amounts: [
      {
        label: "Pledge",
        value: 3000000,
      },
      {
        label: "Contribution",
        value: 1495856.6099999999,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 12,
  },
  {
    code: "Goodbye Malaria - Sonhos Social Capital / Relate Trust ZA",
    geoName: "Goodbye Malaria - Sonhos Social Capital / Relate Trust ZA",
    id: "f21a7446-04bf-4713-a570-ea5e015a8353",
    latitude: -26.203952,
    longitude: 28.045707,
    amounts: [
      {
        label: "Pledge",
        value: 9500000,
      },
      {
        label: "Contribution",
        value: 4407071.34,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 13,
  },
  {
    code: "Standard Bank",
    geoName: "Standard Bank",
    id: "e4cf9248-1ff5-4326-a265-8fffded54a3a",
    latitude: -26.209183,
    longitude: 28.039295,
    amounts: [
      {
        label: "Pledge",
        value: 4000000,
      },
      {
        label: "Contribution",
        value: 2000000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 14,
  },
  {
    code: "Debt2Health - Germany-Indonesia",
    geoName: "Debt2Health - Germany-Indonesia",
    id: "3f9c4437-f152-45cb-a013-c79c4b000bb9",
    latitude: 51.1657,
    longitude: 10.4515,
    amounts: [
      {
        label: "Pledge",
        value: 34795010.010000005,
      },
      {
        label: "Contribution",
        value: 34795010.010000005,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [51.1657, 10.4515],
      [-0.789275, 113.921],
    ],
    intId: 15,
  },
  {
    code: "Debt2Health - Australia-Indonesia",
    geoName: "Debt2Health - Australia-Indonesia",
    id: "44d4169a-3091-4bf1-a9c6-c8a07af14239",
    latitude: -25.2744,
    longitude: 133.775,
    amounts: [
      {
        label: "Pledge",
        value: 35267489.57,
      },
      {
        label: "Contribution",
        value: 35267489.56,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [-25.2744, 133.775],
      [-0.789275, 113.921],
    ],
    intId: 16,
  },
  {
    code: "AMFm World Health Organization-Unitaid",
    geoName: "AMFm World Health Organization-Unitaid",
    id: "8c2c7556-5d8e-4517-a385-ff4d276a14f4",
    latitude: 46.232786,
    longitude: 6.134357,
    amounts: [
      {
        label: "Pledge",
        value: 200000000,
      },
      {
        label: "Contribution",
        value: 200000000,
      },
    ],
    subType: "Affordable Medicines Facility - malaria (AMFm)",
    d2hCoordinates: null,
    intId: 17,
  },
  {
    code: "Idol Gives Back",
    geoName: "Idol Gives Back",
    id: "b0256828-178d-467b-927d-b3f850f73ec5",
    latitude: 34.066675,
    longitude: -118.407035,
    amounts: [
      {
        label: "Pledge",
        value: 16600000,
      },
      {
        label: "Contribution",
        value: 16600000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 18,
  },
  {
    code: "Munich Re",
    geoName: "Munich Re",
    id: "4457dc45-fcfc-4760-9a5d-d7f1d3082673",
    latitude: 48.134272,
    longitude: 11.583377,
    amounts: [
      {
        label: "Pledge",
        value: 1002000,
      },
      {
        label: "Contribution",
        value: 1002000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 19,
  },
  {
    code: "Tahir Foundation",
    geoName: "Tahir Foundation",
    id: "fb18138f-8b91-47af-9909-98a695f69cfe",
    latitude: -6.209264,
    longitude: 106.845653,
    amounts: [
      {
        label: "Pledge",
        value: 79215156,
      },
      {
        label: "Contribution",
        value: 23340405.42,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 20,
  },
  {
    code: "Nationale Postcode Loterij N.V.",
    geoName: "Nationale Postcode Loterij N.V.",
    id: "711aa009-9356-49a4-84af-8795a20fa984",
    latitude: 52.341364,
    longitude: 4.87588,
    amounts: [
      {
        label: "Pledge",
        value: 3397662.5,
      },
      {
        label: "Contribution",
        value: 3397662.5,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 21,
  },
  {
    code: "Debt2Health - Germany-Pakistan",
    geoName: "Debt2Health - Germany-Pakistan",
    id: "7e7ae1f7-7d8f-4a63-94d0-e8aaad4cf725",
    latitude: 51.1657,
    longitude: 10.4515,
    amounts: [
      {
        label: "Pledge",
        value: 26374033.299999997,
      },
      {
        label: "Contribution",
        value: 26374033.299999997,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [51.1657, 10.4515],
      [30.3753, 69.3451],
    ],
    intId: 22,
  },
  {
    code: "Comic Relief",
    geoName: "Comic Relief",
    id: "91582bb6-fcb8-444b-a8f2-280a88cf0c1b",
    latitude: 51.507461,
    longitude: -0.127867,
    amounts: [
      {
        label: "Pledge",
        value: 52195069.92,
      },
      {
        label: "Contribution",
        value: 37430669.89000001,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 23,
  },
  {
    code: "Rotary Australia World Community Service and Rotarians Against Malaria",
    geoName:
      "Rotary Australia World Community Service and Rotarians Against Malaria",
    id: "ddea828b-46bc-4d6d-adc2-830d9ce4985e",
    latitude: -33.813585,
    longitude: 151.003281,
    amounts: [
      {
        label: "Pledge",
        value: 7200000,
      },
      {
        label: "Contribution",
        value: 0,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 25,
  },
  {
    code: "Debt2Health - Spain-Cameroon",
    geoName: "Debt2Health - Spain-Cameroon",
    id: "6d7b82f0-5799-4e45-916d-75cd6eb7f938",
    latitude: 40.4637,
    longitude: -3.74922,
    amounts: [
      {
        label: "Pledge",
        value: 10456922.93,
      },
      {
        label: "Contribution",
        value: 10456922.93,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [40.4637, -3.74922],
      [7.36972, 12.3547],
    ],
    intId: 26,
  },
  {
    code: "AMFm United Kingdom",
    geoName: "AMFm United Kingdom",
    id: "8f4ad3b5-d33d-4f8b-9a57-91d9a66e4eda",
    latitude: 55.3781,
    longitude: -3.43597,
    amounts: [
      {
        label: "Pledge",
        value: 273496422.4,
      },
      {
        label: "Contribution",
        value: 273496422.4,
      },
    ],
    subType: "Affordable Medicines Facility - malaria (AMFm)",
    d2hCoordinates: null,
    intId: 27,
  },
  {
    code: "Catholic Relief Services",
    geoName: "Catholic Relief Services",
    id: "d7507196-a02a-4813-b26e-16c956897b62",
    latitude: 39.288937,
    longitude: -76.616035,
    amounts: [
      {
        label: "Pledge",
        value: 8000000,
      },
      {
        label: "Contribution",
        value: 5000000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 28,
  },
  {
    code: "Cordaid",
    geoName: "Cordaid",
    id: "d615ab13-beae-48ca-8d6b-1183d9ab4787",
    latitude: 52.070488,
    longitude: 4.299397,
    amounts: [
      {
        label: "Pledge",
        value: 5000000,
      },
      {
        label: "Contribution",
        value: 0,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 29,
  },
  {
    code: "Le Nu Thuy Dong",
    geoName: "Le Nu Thuy Dong",
    id: "fc45c809-670a-4907-a559-ba967257dfcf",
    latitude: 21.027626,
    longitude: 105.833445,
    amounts: [
      {
        label: "Pledge",
        value: 1000000,
      },
      {
        label: "Contribution",
        value: 0,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 30,
  },
  {
    code: "Human Crescent",
    geoName: "Human Crescent",
    id: "f9829f47-5156-41fc-a28c-a665db02afae",
    latitude: 25.210167,
    longitude: 55.271686,
    amounts: [
      {
        label: "Pledge",
        value: 10000000,
      },
      {
        label: "Contribution",
        value: 0,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 31,
  },
  {
    code: "Debt2Health - Germany - El Salvador",
    geoName: "Debt2Health - Germany - El Salvador",
    id: "05ba533d-74e4-4000-a00f-2dbfeaabd22f",
    latitude: 51.1657,
    longitude: 10.4515,
    amounts: [
      {
        label: "Pledge",
        value: 11222085.1,
      },
      {
        label: "Contribution",
        value: 10782777.53,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [51.1657, 10.4515],
      [13.7942, -88.8965],
    ],
    intId: 32,
  },
  {
    code: "AMFm Canada",
    geoName: "AMFm Canada",
    id: "a03f6b1c-260f-4d6b-b8cf-b1b75a775725",
    latitude: 56.1304,
    longitude: -106.347,
    amounts: [
      {
        label: "Pledge",
        value: 39596763.03,
      },
      {
        label: "Contribution",
        value: 39596763.03,
      },
    ],
    subType: "Affordable Medicines Facility - malaria (AMFm)",
    d2hCoordinates: null,
    intId: 33,
  },
  {
    code: "Ecobank",
    geoName: "Ecobank",
    id: "2716bddd-01dd-4899-9ba3-d88cc415b972",
    latitude: 6.125657,
    longitude: 1.226949,
    amounts: [
      {
        label: "Pledge",
        value: 6000000,
      },
      {
        label: "Contribution",
        value: 1500000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 34,
  },
  {
    code: "Communitas Foundation",
    geoName: "Communitas Foundation",
    id: "09ddb1e1-3683-4105-8e12-ee6019a4c89d",
    latitude: 42.694149,
    longitude: 23.321885,
    amounts: [
      {
        label: "Pledge",
        value: 2000000,
      },
      {
        label: "Contribution",
        value: 2000000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 35,
  },
  {
    code: "Anglo American plc",
    geoName: "Anglo American plc",
    id: "2745eb35-8ac5-4967-98b0-ec5ce3a200b1",
    latitude: -26.207671,
    longitude: 28.03638,
    amounts: [
      {
        label: "Pledge",
        value: 3000000,
      },
      {
        label: "Contribution",
        value: 3000000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 36,
  },
  {
    code: "Debt2Health - Spain-Congo (Democratic Republic)",
    geoName: "Debt2Health - Spain-Congo (Democratic Republic)",
    id: "4f819b50-7f02-4df6-8ff4-0543b199e760",
    latitude: 40.4637,
    longitude: -3.74922,
    amounts: [
      {
        label: "Pledge",
        value: 3403543.45,
      },
      {
        label: "Contribution",
        value: 3403543.45,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [40.4637, -3.74922],
      [-4.03833, 21.7587],
    ],
    intId: 37,
  },
  {
    code: "AMFm Bill & Melinda Gates Foundation",
    geoName: "AMFm Bill & Melinda Gates Foundation",
    id: "d23e26ef-f8c6-45c6-beaa-6a1ee1dd770c",
    latitude: 47.861959,
    longitude: -122.316256,
    amounts: [
      {
        label: "Pledge",
        value: 24365000,
      },
      {
        label: "Contribution",
        value: 24365000,
      },
    ],
    subType: "Affordable Medicines Facility - malaria (AMFm)",
    d2hCoordinates: null,
    intId: 38,
  },
  {
    code: "M∙A∙C AIDS Fund",
    geoName: "M∙A∙C AIDS Fund",
    id: "5f1c88a4-0191-4855-be94-a7682a4cfa8c",
    latitude: 40.763657,
    longitude: -73.972697,
    amounts: [
      {
        label: "Pledge",
        value: 3250000,
      },
      {
        label: "Contribution",
        value: 3250000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 39,
  },
  {
    code: "Duet Group",
    geoName: "Duet Group",
    id: "fa882f8e-1ae8-42e3-bb1e-c9f3b1db4ef1",
    latitude: 51.508522,
    longitude: -0.148598,
    amounts: [
      {
        label: "Pledge",
        value: 2600000,
      },
      {
        label: "Contribution",
        value: 0,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 40,
  },
  {
    code: "BHP Billiton Sustainable Communities",
    geoName: "BHP Billiton Sustainable Communities",
    id: "b605f485-c168-457e-959e-31b35ce5ea98",
    latitude: 51.496807,
    longitude: -0.143913,
    amounts: [
      {
        label: "Pledge",
        value: 10000000,
      },
      {
        label: "Contribution",
        value: 10000000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 41,
  },
  {
    code: "Co-Impact",
    geoName: "Co-Impact",
    id: "1e399613-2a7b-4ca7-94b2-680f8023a788",
    latitude: 40.712499,
    longitude: -74.019512,
    amounts: [
      {
        label: "Pledge",
        value: 8000000,
      },
      {
        label: "Contribution",
        value: 1450000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 43,
  },
  {
    code: "Vale",
    geoName: "Vale",
    id: "1752b071-67f1-4655-a1e2-add62c550f91",
    latitude: -22.91009,
    longitude: -43.179597,
    amounts: [
      {
        label: "Pledge",
        value: 3000000,
      },
      {
        label: "Contribution",
        value: 3000000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 44,
  },
  {
    code: "Debt2Health - Germany-Egypt",
    geoName: "Debt2Health - Germany-Egypt",
    id: "92ba554b-281b-41dc-acbc-a4580c3a9f78",
    latitude: 51.1657,
    longitude: 10.4515,
    amounts: [
      {
        label: "Pledge",
        value: 4807118.2,
      },
      {
        label: "Contribution",
        value: 4807118.2,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [51.1657, 10.4515],
      [26.8206, 30.8025],
    ],
    intId: 45,
  },
  {
    code: "YMCA and Y's Men International",
    geoName: "YMCA and Y's Men International",
    id: "b14377ea-858c-49e9-93df-3a1abdc917df",
    latitude: 46.204494,
    longitude: 6.142715,
    amounts: [
      {
        label: "Pledge",
        value: 500000,
      },
      {
        label: "Contribution",
        value: 100000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 46,
  },
  {
    code: "Debt2Health - Spain-Ethiopia",
    geoName: "Debt2Health - Spain-Ethiopia",
    id: "6b9b8d91-f85a-4625-b6d3-594d0af8afa5",
    latitude: 40.4637,
    longitude: -3.74922,
    amounts: [
      {
        label: "Pledge",
        value: 3581142.41,
      },
      {
        label: "Contribution",
        value: 3581142.41,
      },
    ],
    subType: "Debt2Health",
    d2hCoordinates: [
      [40.4637, -3.74922],
      [9.145, 40.4897],
    ],
    intId: 48,
  },
  {
    code: "Hottokenai Campaign (G-CAP Coalition Japan)",
    geoName: "Hottokenai Campaign (G-CAP Coalition Japan)",
    id: "5d3faec4-2c58-4a2c-8681-bca41df24512",
    latitude: 35.715166,
    longitude: 139.785053,
    amounts: [
      {
        label: "Pledge",
        value: 250000,
      },
      {
        label: "Contribution",
        value: 250000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 49,
  },
  {
    code: "Plan International and Plan Canada",
    geoName: "Plan International and Plan Canada",
    id: "069098bd-13d9-408f-83c5-9758a24d05f4",
    latitude: 43.652925,
    longitude: -79.384239,
    amounts: [
      {
        label: "Pledge",
        value: 2931889.94,
      },
      {
        label: "Contribution",
        value: 0,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 50,
  },
  {
    code: "Rockefeller Foundation",
    geoName: "Rockefeller Foundation",
    id: "20ba6f33-4804-4a17-85a5-002b14403f8a",
    latitude: 40.750907,
    longitude: -73.983324,
    amounts: [
      {
        label: "Pledge",
        value: 15000000,
      },
      {
        label: "Contribution",
        value: 3000000,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 52,
  },
  {
    code: "FIFA Foundation",
    geoName: "FIFA Foundation",
    id: "e02f0e36-d6c3-472a-9da6-f27f97d59204",
    latitude: 47.381556,
    longitude: 8.57455,
    amounts: [
      {
        label: "Pledge",
        value: 1500000,
      },
      {
        label: "Contribution",
        value: 0,
      },
    ],
    subType: "Private Sector & Nongovernment",
    d2hCoordinates: null,
    intId: 53,
  },
];

export const NO_DATA_COLOR = "#F7FAFF";
export const NO_DATA_BORDER_COLOR = "#C7CDD1";
