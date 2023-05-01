import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import Button from "@material-ui/core/Button";
import { useCMSData } from "app/hooks/useCMSData";
import { useStoreState } from "app/state/store/hooks";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { IndicatorToolTip } from "app/components/PerformanceFrameworkExpandedView/components/ToolTip";
import { ArrowSelector } from "app/components/PerformanceFrameworkExpandedView/components/ArrowSelector";
import {
  PFIndicator,
  PFIndicatorResult,
} from "app/components/PerformanceFrameworkExpandedView/data";

const styles = {
  table: css`
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;

    @media (max-width: 767px) {
      width: 700px;
      min-width: 700px;
      max-width: 700px;
    }
  `,
  tablehead: css`
    th {
      padding: 9px 0;
      text-align: start;
      border-top: 1px solid #adb5bd;
      border-bottom: 1px solid #adb5bd;
    }
  `,
  tablebody: css`
    td {
      font-size: 12px;

      > span {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  `,
};

export function ResultsTable(props: PFIndicator) {
  const selected = useStoreState(
    (state) => state.ToolBoxPanelPFPeriodState.value
  );
  const cmsData = useCMSData({ returnData: true });

  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return <MobileResultsTable {...props} />;
  }

  return (
    <div
      css={`
        font-size: 12px;
      `}
    >
      <b>Indicator: {props.name}</b>
      <div
        css={`
          width: 100%;

          @media (max-width: 767px) {
            overflow-x: auto;
          }
        `}
      >
        <table css={styles.table}>
          <thead css={styles.tablehead}>
            <tr>
              <th>
                {get(
                  cmsData,
                  "componentsPerformanceFrameworkComponents.resultsTableResultType",
                  ""
                )}
              </th>
              <th>
                {get(
                  cmsData,
                  "componentsPerformanceFrameworkComponents.resultsTableBaseline",
                  ""
                )}
              </th>
              <th>
                {get(
                  cmsData,
                  "componentsPerformanceFrameworkComponents.resultsTableTarget",
                  ""
                )}
              </th>
              <th>
                {get(
                  cmsData,
                  "componentsPerformanceFrameworkComponents.resultsTableResult",
                  ""
                )}
              </th>
              <th>
                {get(
                  cmsData,
                  "componentsPerformanceFrameworkComponents.resultsTableAchievementRate",
                  ""
                )}
              </th>
              <th>
                {get(
                  cmsData,
                  "componentsPerformanceFrameworkComponents.resultsTableReportingPeriods",
                  ""
                )}
              </th>
              <th> </th>
            </tr>
          </thead>
          <tbody css={styles.tablebody}>
            {props.results.map((result: PFIndicatorResult, index: number) => (
              <ResultsTableRow
                key={result.period}
                selected={index === props.results.length - selected - 1}
                {...result}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ResultsTableRowProps extends PFIndicatorResult {
  selected: boolean;
}

function ResultsTableRow(props: ResultsTableRowProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const cmsData = useCMSData({ returnData: true });

  return (
    <tr
      css={`
        background-color: ${props.selected ? "#cfd4da" : "transparent"};
      `}
    >
      <td>{props.type}</td>
      <td>{props.baseline}</td>
      <td>{props.target}</td>
      <td>{props.result}</td>
      <td>
        <div
          css={`
            gap: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;

            > * {
              @supports (-webkit-touch-callout: none) and
                (not (translate: none)) {
                &:not(:last-child) {
                  margin-right: 20px;
                }
              }
            }
          `}
        >
          <div
            css={`
              gap: 10px;
              display: flex;
              flex-direction: row;
              align-items: center;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 10px;
                  }
                }
              }

              > svg {
                transform: rotate(90deg);
                visibility: ${props.selected ? "visible" : "hidden"};
              }
            `}
          >
            <TriangleXSIcon />
            <div
              css={`
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${props.color === "#E2E2E2"
                  ? `repeating-linear-gradient(
                    -45deg,
                    #231d2c 0 0.5px,
                    #fff 1.5px 2px
                    )`
                  : props.color};
              `}
            />
          </div>
          <div
            css={`
              min-width: 30px;
            `}
          >
            {props.achievementRate
              ? props.achievementRate
              : get(
                  cmsData,
                  "componentsPerformanceFrameworkComponents.resultsTableNotAvailable",
                  ""
                )}
          </div>
        </div>
      </td>
      <td>{props.period}</td>
      <td>
        <IndicatorToolTip
          data={props}
          show={showTooltip}
          close={() => setShowTooltip(false)}
        >
          <span onClick={() => setShowTooltip(!showTooltip)}>
            {get(
              cmsData,
              "componentsPerformanceFrameworkComponents.resultsTableTooltip",
              ""
            )}
          </span>
        </IndicatorToolTip>
      </td>
    </tr>
  );
}

const mobileStyles = {
  container: css`
    width: 100%;
    display: flex;
    padding-top: 25px;
    flex-direction: column;

    > div {
      display: flex;
      padding: 5px 0;
      flex-direction: row;
      align-items: center;

      > div:first-of-type {
        width: 120px;
      }
    }
  `,
};

function MobileResultsTable(props: PFIndicator) {
  const cmsData = useCMSData({ returnData: true });
  const selected = useStoreState(
    (state) => state.ToolBoxPanelPFPeriodState.value
  );
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [localSelected, setLocalSelected] = React.useState(selected);
  const [selectedItem, setSelectedItem] = React.useState<PFIndicatorResult>(
    props.results[localSelected]
  );

  function onPeriodChange(indexStr: string) {
    setLocalSelected(parseInt(indexStr, 10));
  }

  React.useEffect(() => {
    setSelectedItem(props.results[localSelected]);
  }, [localSelected]);

  return (
    <div
      css={`
        font-size: 12px;
        padding-bottom: 15px;
        border-bottom: 1px solid #231d2c;
      `}
    >
      <b>Indicator: {props.name}</b>
      <div css={mobileStyles.container}>
        <div
          css={`
            > div:nth-of-type(2) {
              margin-left: -13px;
            }
          `}
        >
          <div>
            <b>
              {get(
                cmsData,
                "componentsPerformanceFrameworkComponents.resultsTableReportingPeriods",
                ""
              )}
            </b>
          </div>
          <ArrowSelector
            onChange={onPeriodChange}
            selected={selectedItem.period}
            options={props.results.map(
              (result: PFIndicatorResult, index: number) => ({
                module: result.period,
                filterValue: index.toString(),
              })
            )}
          />
        </div>
        <div>
          <div>
            {get(
              cmsData,
              "componentsPerformanceFrameworkComponents.resultsTableResultType",
              ""
            )}
          </div>
          <div>{selectedItem.type}</div>
        </div>
        <div>
          <div>
            {get(
              cmsData,
              "componentsPerformanceFrameworkComponents.resultsTableBaseline",
              ""
            )}
          </div>
          <div>{selectedItem.baseline}</div>
        </div>
        <div>
          <div>
            {get(
              cmsData,
              "componentsPerformanceFrameworkComponents.resultsTableTarget",
              ""
            )}
          </div>
          <div>{selectedItem.target}</div>
        </div>
        <div>
          <div>
            {get(
              cmsData,
              "componentsPerformanceFrameworkComponents.resultsTableResult",
              ""
            )}
          </div>
          <div>{selectedItem.result}</div>
        </div>
        <div>
          <div>
            {get(
              cmsData,
              "componentsPerformanceFrameworkComponents.resultsTableAchievementRate",
              ""
            )}
          </div>
          <div
            css={`
              gap: 20px;
              display: flex;
              flex-direction: row;
              align-items: center;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 20px;
                  }
                }
              }
            `}
          >
            <div
              css={`
                gap: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 10px;
                    }
                  }
                }

                > svg {
                  transform: rotate(90deg);
                }
              `}
            >
              <div
                css={`
                  min-width: 30px;
                `}
              >
                {selectedItem.achievementRate
                  ? selectedItem.achievementRate
                  : get(
                      cmsData,
                      "componentsPerformanceFrameworkComponents.resultsTableNotAvailable",
                      ""
                    )}
              </div>
              <div
                css={`
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  background: ${selectedItem.color === "#E2E2E2"
                    ? `repeating-linear-gradient(
                    -45deg,
                    #231d2c 0 0.5px,
                    #fff 1.5px 2px
                    )`
                    : selectedItem.color};
                `}
              />
            </div>
          </div>
        </div>
      </div>
      <IndicatorToolTip
        show={showTooltip}
        data={selectedItem}
        close={() => setShowTooltip(false)}
      >
        <Button
          onClick={() => setShowTooltip(!showTooltip)}
          css={`
            width: 100%;
            margin-top: 20px;
            background: #dfe3e6;
            border-radius: 22px;

            &:hover {
              background: #dfe3e6;
            }

            > span {
              color: #231d2c;
              font-size: 14px;
              font-weight: bold;
              text-transform: none;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            }
          `}
        >
          {get(
            cmsData,
            "componentsPerformanceFrameworkComponents.resultsTableTooltip",
            ""
          )}
        </Button>
      </IndicatorToolTip>
    </div>
  );
}
