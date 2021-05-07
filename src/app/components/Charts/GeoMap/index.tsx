import React from "react";
import { mapStyle, GeoMapProps } from "app/components/Charts/GeoMap/data";
import MapGL, {
  LinearInterpolator,
  MapRef,
  Source,
  Layer,
  LayerProps,
} from "react-map-gl";
// import WebMercatorViewport from "viewport-mercator-project";

export function GeoMap(props: GeoMapProps) {
  const mapRef = React.useRef();
  const [viewport, setViewport] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 1.3,
    bearing: 0,
    pitch: 0,
    width: "100%",
    height: "100%",
    transitionInterpolator: new LinearInterpolator(),
    transitionDuration: 1000,
  });
  const [settings, setSettings] = React.useState({
    dragPan: true,
    dragRotate: false,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: false,
    keyboard: true,
    doubleClickZoom: false,
    minZoom: 1.3,
    maxZoom: 3,
  });
  const layerStyle: LayerProps = {
    type: "fill",
    paint: {
      "fill-color": {
        property: "value",
        default: "transparent",
        stops: [
          [0, "#ffffff"],
          [1, "#eeefef"],
          [2, "#dddedf"],
          [3, "#cccecf"],
          [4, "#bbbdbf"],
          [5, "#aaadaf"],
          [6, "#9a9da0"],
          [7, "#898c90"],
          [8, "#787c80"],
          [9, "#676b70"],
          [10, "#565b60"],
          [11, "#454a50"],
          [12, "#343A40"],
        ],
      },
    },
  };

  return (
    <div
      css={`
        width: 100%;
        height: calc(100vh - 158px);
      `}
    >
      <MapGL
        {...viewport}
        {...settings}
        width="100%"
        height="100%"
        mapStyle={mapStyle}
        ref={(ref: MapRef) => {
          if (ref) mapRef.current = ref.getMap();
        }}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Source type="geojson" data={props.data}>
          <Layer {...layerStyle} />
        </Source>
      </MapGL>
    </div>
  );
}
