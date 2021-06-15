/* base */
import React from "react";
import { useHoverDirty } from "react-use";
import { useHistory } from "react-router-dom";
// import WebMercatorViewport from "viewport-mercator-project";
import MapGL, {
  LinearInterpolator,
  MapRef,
  Source,
  Layer,
  LayerProps,
  Popup,
} from "react-map-gl";

/* utils */
import filter from "lodash/filter";
import { lineString } from "@turf/helpers";
import bezierSpline from "@turf/bezier-spline";

/* components */
import {
  mapStyle,
  GeoMapProps,
  GeoMapPinMarker,
  getMapPinIcons,
} from "app/components/Charts/GeoMap/data";
import {
  GeomapPinTooltip,
  GeomapTooltip,
} from "app/components/Charts/GeoMap/components/tooltip";
import { MapPin } from "app/components/Charts/GeoMap/components/pins";

export function GeoMap(props: GeoMapProps) {
  const history = useHistory();
  const mapRef = React.useRef<React.Ref<MapRef>>();
  const containerRef = React.useRef<HTMLDivElement>();
  const isHovering = useHoverDirty(containerRef as React.RefObject<Element>);
  const [viewport, setViewport] = React.useState({
    latitude: 37.307990048281795,
    longitude: 4.5689197295041035,
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
      "fill-outline-color": {
        property: "value",
        default: "#ffffff",
        stops: [
          [0, "#C7CDD1"],
          [1, "#ffffff"],
          [2, "#ffffff"],
          [3, "#ffffff"],
          [4, "#ffffff"],
          [5, "#ffffff"],
          [6, "#ffffff"],
          [7, "#ffffff"],
          [8, "#ffffff"],
          [9, "#ffffff"],
          [10, "#ffffff"],
          [11, "#ffffff"],
          [12, "#ffffff"],
        ],
      },
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
  const [
    pinMarkerHoverInfo,
    setPinMarkerHoverInfo,
  ] = React.useState<GeoMapPinMarker | null>(null);
  const [renderedLines, setRenderedLines] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (
      pinMarkerHoverInfo &&
      pinMarkerHoverInfo.d2hCoordinates &&
      pinMarkerHoverInfo.d2hCoordinates.length > 0
    ) {
      const allD2HofSameCountryDonor = filter(
        props.pins,
        (pin: GeoMapPinMarker) => {
          if (
            pin.d2hCoordinates &&
            pinMarkerHoverInfo &&
            pinMarkerHoverInfo.d2hCoordinates
          ) {
            return (
              pin.d2hCoordinates[0][0] ===
                pinMarkerHoverInfo.d2hCoordinates[0][0] &&
              pin.d2hCoordinates[0][1] ===
                pinMarkerHoverInfo.d2hCoordinates[0][1]
            );
          }
          return false;
        }
      );
      const lineIds: string[] = [];
      allD2HofSameCountryDonor.forEach((item: GeoMapPinMarker) => {
        const positions = item.d2hCoordinates
          ? item.d2hCoordinates.map((c: number[]) => [c[1], c[0]])
          : [];
        const line = bezierSpline(lineString(positions), { sharpness: 0 });
        lineIds.push(item.intId.toString());
        if (mapRef.current) {
          // @ts-ignore
          mapRef.current.addLayer({
            id: item.intId.toString(),
            type: "line",
            metadata: item,
            source: {
              type: "geojson",
              data: line,
            },
            paint: {
              "line-width": 2,
              "line-color": "#2E4DF9",
              "line-dasharray": [3, 3],
            },
          });
        }
      });
      setRenderedLines(lineIds);
    } else if (renderedLines.length > 0) {
      renderedLines.forEach((line: string) => {
        // @ts-ignore
        if (mapRef.current && mapRef.current.getSource(line)) {
          // @ts-ignore
          mapRef.current.removeLayer(line);
          // @ts-ignore
          mapRef.current.removeSource(line);
        }
      });
    }
  }, [pinMarkerHoverInfo]);

  const onHover = React.useCallback((event: any) => {
    const {
      features,
      srcEvent: { pageX, pageY },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature &&
        hoveredFeature.properties &&
        hoveredFeature.properties.name &&
        hoveredFeature.properties.value > 0
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
      hoveredFeature.properties.iso_a3 &&
      hoveredFeature.properties.value > 0
    ) {
      history.push(`/location/${hoveredFeature.properties.iso_a3}/investments`);
    }
  }, []);

  const uMapStyle = mapStyle;
  if (props.data.features.length === 0) {
    uMapStyle.layers[0].paint["background-color"] = "hsl(204, 10%, 80%)";
  }

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
        mapStyle={uMapStyle}
        ref={(ref: MapRef) => {
          if (ref) mapRef.current = ref.getMap();
        }}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Source type="geojson" data={props.data}>
          <Layer {...layerStyle} />
        </Source>
        {props.pins.map((pin: GeoMapPinMarker) => {
          const icons = getMapPinIcons(pin.subType);
          return (
            <MapPin
              key={pin.id}
              marker={pin}
              setMarkerInfo={setPinMarkerHoverInfo}
              onClick={() => console.log("onClick")}
              {...icons}
            />
          );
        })}
        {pinMarkerHoverInfo && (
          <Popup
            tipSize={0}
            dynamicPosition
            offsetLeft={20}
            closeButton={false}
            latitude={pinMarkerHoverInfo.latitude}
            longitude={pinMarkerHoverInfo.longitude}
            css={`
              z-index: 100;

              .mapboxgl-popup-content {
                width: 0px !important;
                height: 0px !important;
                padding: 0px !important;
              }
            `}
          >
            <div
              css={`
                width: 350px;
                padding: 20px;
                position: absolute;
                background: #f5f5f7;
                border-radius: 20px;
              `}
            >
              <GeomapPinTooltip pin={pinMarkerHoverInfo} allPins={props.pins} />
            </div>
          </Popup>
        )}
      </MapGL>
      {hoverInfo && isHovering && props.type === "investments" && (
        <div
          css={`
            z-index: 100;
            width: 350px;
            padding: 20px;
            position: absolute;
            background: #f5f5f7;
            border-radius: 20px;
            top: ${hoverInfo.y + 50}px;
            left: ${hoverInfo.x - 180}px;
          `}
        >
          <GeomapTooltip {...hoverInfo.properties} />
        </div>
      )}
      {hoverInfo && isHovering && props.type === "donors" && (
        <div
          css={`
            z-index: 100;
            width: 350px;
            padding: 20px;
            position: absolute;
            background: #f5f5f7;
            border-radius: 20px;
            top: ${hoverInfo.y + 50}px;
            left: ${hoverInfo.x - 180}px;
          `}
        >
          <GeomapPinTooltip
            allPins={props.pins}
            pin={hoverInfo.properties.data}
          />
        </div>
      )}
    </div>
  );
}
