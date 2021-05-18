import React from "react";
import { useHoverDirty } from "react-use";
import { useHistory } from "react-router-dom";
import { mapStyle, GeoMapProps } from "app/components/Charts/GeoMap/data";
import MapGL, {
  LinearInterpolator,
  MapRef,
  Source,
  Layer,
  LayerProps,
} from "react-map-gl";
import { GeomapTooltip } from "./components/tooltip";
// import WebMercatorViewport from "viewport-mercator-project";

export function GeoMap(props: GeoMapProps) {
  const history = useHistory();
  const mapRef = React.useRef();
  const containerRef = React.useRef<HTMLDivElement>();
  const isHovering = useHoverDirty(containerRef as React.RefObject<Element>);
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
  const [hoverInfo, setHoverInfo] = React.useState<any>(null);

  const onHover = React.useCallback((event: any) => {
    const {
      features,
      srcEvent: { pageX, pageY },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature &&
        hoveredFeature.properties &&
        hoveredFeature.properties.name
        ? {
            properties: {
              ...hoveredFeature.properties,
              data: JSON.parse(hoveredFeature.properties.data),
            },
            x: pageX,
            y: pageY,
          }
        : null
    );
  }, []);

  const onClick = React.useCallback((event: any) => {
    const { features } = event;
    const hoveredFeature = features && features[0];
    if (
      hoveredFeature &&
      hoveredFeature.properties &&
      hoveredFeature.properties.iso_a3
    ) {
      history.push(`/location/${hoveredFeature.properties.iso_a3}/investments`);
    }
  }, []);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      css={`
        width: 100%;
        height: calc(100vh - 244px);
      `}
    >
      <MapGL
        {...viewport}
        {...settings}
        width="100%"
        height="100%"
        onHover={onHover}
        onClick={onClick}
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
      {hoverInfo && isHovering && (
        <div
          css={`
            z-index: 100;
            width: 350px;
            padding: 20px;
            position: absolute;
            background: #f5f5f7;
            border-radius: 20px;
            top: ${hoverInfo.y + 10}px;
            left: ${hoverInfo.x - 180}px;
          `}
        >
          <GeomapTooltip {...hoverInfo.properties} />
        </div>
      )}
    </div>
  );
}
