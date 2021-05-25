/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { NetworkViz } from "app/components/Charts/Network";
import { mockdata } from "app/components/Charts/Network/data";
import { SlideInContainer } from "app/components/SlideInPanel";
import { TransitionContainer } from "app/components/TransitionContainer";
import { PerformanceFrameworkExpandedView } from "app/components/PerformanceFrameworkExpandedView";

export function PerformanceFrameworkModule() {
  useTitle("The Data Explorer - Performance Framework");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  return (
    <div
      css={`
        width: 100%;

        ${!vizSelected
          ? `* {
            overflow: visible !important;
          }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={1} vizTranslation={vizTranslation}>
        <NetworkViz
          data={mockdata}
          selectedNodeId={vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {
            setVizLevel(1);
            setVizSelected(node);
            setVizTranslation({ x: x * -1, y: y * -1 });
          }}
        />
      </TransitionContainer>
      <SlideInContainer
        vizLevel={vizLevel}
        selected={vizSelected}
        close={() => {
          setVizLevel(0);
          setVizSelected(undefined);
          setVizTranslation({ x: 0, y: 0 });
        }}
      >
        <PerformanceFrameworkExpandedView />
      </SlideInContainer>
    </div>
  );
}
