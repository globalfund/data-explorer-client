/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { SlideInContainer } from "app/components/SlideInPanel";
import { TransitionContainer } from "app/components/TransitionContainer";
import { mockdata } from "app/components/Charts/Investments/TimeCycle/data";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsTimeCycle } from "app/components/Charts/Investments/TimeCycle";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

export function InvestmentsTimeCycleModule() {
  useTitle("The Data Explorer - Investments/Time cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizScale, setVizScale] = React.useState(1);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    setTimeout(() => {
      const viz = document.getElementById("investments-time-cycle");
      if (viz) {
        const svgs = viz.getElementsByTagName("svg");
        if (svgs.length > 1) {
          const pathElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          pathElement.setAttribute("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2");
          pathElement.setAttribute("stroke", "#FBAC1B");
          pathElement.setAttribute("strokeWidth", "1");

          const patternElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "pattern"
          );
          patternElement.setAttribute("id", "diagonalHatch");
          patternElement.setAttribute("patternUnits", "userSpaceOnUse");
          patternElement.setAttribute("width", "4");
          patternElement.setAttribute("height", "4");
          patternElement.appendChild(pathElement);

          const defsElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
          );
          defsElement.appendChild(patternElement);

          svgs[1].appendChild(defsElement);
        }
      }
    }, 1000);
  }, []);

  return (
    <div
      id="investments-time-cycle"
      css={`
        width: 100%;

        ${!vizSelected
          ? `* {
      overflow: visible !important;
    }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={vizScale} vizTranslation={vizTranslation}>
        <InvestmentsTimeCycle
          data={mockdata}
          selectedNodeId={vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {
            setVizLevel(1);
            setVizSelected(node);
            setVizTranslation({ x: x * -1, y: 0 });
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
        <DisbursementsTreemap
          data={mockdata2}
          onNodeClick={(node: string, x: number, y: number) => {}}
        />
      </SlideInContainer>
    </div>
  );
}
