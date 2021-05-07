import { FeatureCollection, Feature } from "geojson";

export interface GeoMapProps {
  data: FeatureCollection;
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
            paint: { "line-width": 1, "line-color": "#c7cdd1" },
          },
          "admin-0-boundary": {
            paint: { "line-width": 1, "line-color": "#c7cdd1" },
          },
          "admin-0-boundary-bg": {
            paint: { "line-color": "#c7cdd1", "line-width": 1 },
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
              "fill-outline-color": "#c7cdd1",
            },
            layout: { visibility: "none" },
          },
          water: {
            paint: {
              "fill-color": "hsl(204, 0%, 100%)",
              "fill-outline-color": "#c7cdd1",
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
        "fill-outline-color": "#c7cdd1",
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
        "fill-outline-color": "#c7cdd1",
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
        "line-color": "#c7cdd1",
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
      paint: { "line-color": "#c7cdd1", "line-dasharray": [10, 0] },
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
        "line-color": "#c7cdd1",
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
        features: data.features.map((item: Feature) => ({
          ...item,
          properties: {
            ...item.properties,
            value: Math.random() * 13,
            data: {
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
            },
          },
        })),
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
}
