import React from "react";
import { appColors } from "app/theme";
import Tooltip from "@material-ui/core/Tooltip";
import { TickIcon } from "app/assets/icons/Tick";
import { Link, useLocation } from "react-router-dom";
import { getChartIcon } from "app/components/ToolBoxPanel/utils/getChartIcon";
import { ViewModel } from "app/components/ToolBoxPanel/utils/getControlItems";

interface ToolBoxPanelControlRowProps {
  title: string;
  selected: string;
  options: ViewModel[];
  setSelected: (value: string) => void;
}

export function ToolBoxPanelControlRow(props: ToolBoxPanelControlRowProps) {
  const location = useLocation();
  return (
    <div
      css={`
        gap: 12px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px 35px 15px 25px;
        justify-content: space-between;
        border-bottom: 1px solid
          ${appColors.TOOLBOX.SECTION_BORDER_BOTTOM_COLOR};

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 12px;
            }
          }
        }
      `}
    >
      <b>{props.title}</b>
      <div
        css={`
          gap: 12px;
          display: flex;
          flex-direction: row;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 12px;
              }
            }
          }
        `}
      >
        {props.options.map((option: ViewModel) =>
          option.link ? (
            <Tooltip title={option.label} key={option.value}>
              <Link
                onClick={() => props.setSelected(option.value)}
                to={`${option.link}${location.search}`}
                css={`
                  gap: 6px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  text-decoration: none;

                  > * {
                    @supports (-webkit-touch-callout: none) and
                      (not (translate: none)) {
                      &:not(:last-child) {
                        margin-right: 6px;
                      }
                    }
                  }

                  path {
                    fill: ${props.selected === option.value
                      ? appColors.TOOLBOX.VIEWS_ICON_ACTIVE_COLOR
                      : appColors.TOOLBOX.VIEWS_ICON_COLOR};
                  }
                  rect {
                    fill: ${props.selected === option.value
                      ? appColors.TOOLBOX.VIEWS_ICON_ACTIVE_COLOR
                      : appColors.TOOLBOX.VIEWS_ICON_COLOR};
                  }

                  &:hover {
                    color: ${appColors.COMMON.WHITE};
                    cursor: pointer;

                    path {
                      fill: ${appColors.TOOLBOX.VIEWS_ICON_ACTIVE_COLOR};
                    }
                  }
                `}
              >
                {getChartIcon(option)}
              </Link>
            </Tooltip>
          ) : (
            <button
              type="button"
              key={option.value}
              onClick={() => props.setSelected(option.value)}
              css={`
                gap: 6px;
                display: flex;
                font-size: 12px;
                border-width: 0;
                line-height: 24px;
                padding: 8px 12px;
                flex-direction: row;
                border-radius: 20px;
                align-items: center;
                color: ${props.selected === option.value
                  ? appColors.COMMON.WHITE
                  : appColors.COMMON.PRIMARY_COLOR_1};
                background: ${props.selected === option.value
                  ? appColors.COMMON.PRIMARY_COLOR_1
                  : appColors.COMMON.WHITE};

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 6px;
                    }
                  }
                }

                &:hover {
                  color: ${appColors.COMMON.WHITE};
                  cursor: pointer;
                  background: ${props.selected === option.value
                    ? appColors.COMMON.PRIMARY_COLOR_1
                    : appColors.COMMON.SECONDARY_COLOR_13};
                }
              `}
            >
              {props.selected === option.value && <TickIcon />}
              {option.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
