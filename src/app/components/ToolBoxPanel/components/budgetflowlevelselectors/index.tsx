/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { Dropdown } from "app/components/Dropdown";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";

export function ToolBoxPanelBudgetFlowLevelSelectors() {
  const drilldownPanelOptions = useStoreState(
    (state) => state.ToolBoxPanelBudgetFlowDrilldownSelectors.levels
  );
  const vizSelected = useStoreState(
    (state) => state.ToolBoxPanelBudgetFlowDrilldownSelectors.selectedLevelValue
  );
  const setVizSelected = useStoreActions(
    (actions) =>
      actions.ToolBoxPanelBudgetFlowDrilldownSelectors.setSelectedLevelValue
  );
  const nodes = useStoreState(
    (state) =>
      get(state.BudgetsFlow.data, "nodes", []) as {
        id: string;
        filterStr: string;
      }[]
  );

  return (
    <span
      css={`
        gap: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px 35px 15px 25px;
        border-bottom: 1px solid #dfe3e6;

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 10px;
            }
          }
        }
      `}
    >
      <DrillDownArrowSelector
        options={drilldownPanelOptions.map(
          (option: { name: string; items: string[] }) => option.name
        )}
        selected={get(
          find(
            drilldownPanelOptions,
            (option: { name: string; items: string[] }) =>
              option.items.indexOf(vizSelected.id as string) > -1
          ),
          "name",
          ""
        )}
        onChange={(value: string) => {
          const firstOfLevel = get(
            find(drilldownPanelOptions, { name: value }),
            "items[0]",
            null
          );
          if (firstOfLevel) {
            const fNode = find(nodes, { id: firstOfLevel }) as {
              id: string;
              filterStr: string;
            };
            if (fNode) {
              setVizSelected(fNode);
            }
          }
        }}
      />
      <Dropdown
        options={get(
          find(
            drilldownPanelOptions,
            (option: { name: string; items: string[] }) =>
              option.items.indexOf(vizSelected.id as string) > -1
          ),
          "items",
          []
        )}
        value={vizSelected.id as string}
        handleChange={(value: string) => {
          const fNode = find(nodes, { id: value }) as {
            id: string;
            filterStr: string;
          };
          if (fNode) {
            setVizSelected(fNode);
          }
        }}
      />
    </span>
  );
}
