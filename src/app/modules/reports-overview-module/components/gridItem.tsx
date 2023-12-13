import React from "react";
import moment from "moment";
import { appColors } from "app/theme";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuOptions from "app/modules/reports-overview-module/components/menuOptions";

interface Props {
  id: string;
  link: string;
  title: string;
  updatedDate: Date;
  description: string;
  icons: React.ReactElement[];
  handleModal: (modalType: string) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

export function GridItem(props: Props) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = React.useState(false);

  const showMenuOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };

  return (
    <div
      css={`
        position: relative;
      `}
    >
      <Link
        to={props.link}
        css={`
          padding: 16px;
          height: 125px;
          background: #f1f3f5;
          position: relative;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          text-decoration: none;

          @media (max-width: 767px) {
            height: 125px;
          }

          > div {
            font-weight: bold;
            line-height: 16px;
            margin-bottom: 4px;
            color: #495057;

            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

            &:nth-of-type(2) {
              color: #495057;
              font-size: 10px;
              font-weight: 325;
              line-height: 12px;
              font-family: "GothamNarrow-Light", "Helvetica Neue", sans-serif;
            }
          }

          &:hover {
            border-color: ${appColors.DATASETS_GRID.ITEM_BORDER_HOVER_COLOR};
          }
        `}
      >
        <div>{props.title}</div>
        <div>{props.description}</div>
        {props.icons && (
          <div
            css={`
              gap: 20px;
              bottom: 20px;
              position: absolute;
              display: flex;
              flex-direction: row;
              align-items: center;

              padding-right: 10px;
              display: inline-flex;
              transform: scale(1.2);

              &:not(:last-child) {
                border-right: 1px solid
                  ${appColors.DATASETS_GRID.ICON_LINK_COLOR};
              }

              > svg {
                > path {
                  fill: ${appColors.DATASETS_GRID.ICON_LINK_COLOR};
                }
                rect {
                  fill: ${appColors.DATASETS_GRID.ICON_LINK_COLOR};
                }

                &:hover {
                  > path {
                    fill: ${appColors.DATASETS_GRID.ICON_LINK_HOVER_COLOR};
                  }
                  > rect {
                    fill: ${appColors.DATASETS_GRID.ICON_LINK_HOVER_COLOR};
                  }
                }
              }
            `}
          >
            {props.icons}
          </div>
        )}
        <div
          css={`
            position: absolute;
            top: 92px;
            right: 14px;
            align-items: flex-end;
            p {
              font-size: 10px;
              color: #495057;
              font-family: "GothamNarrow-Light";
            }
          `}
        >
          <p>Last edited - {moment(props.updatedDate).format("L")}</p>
        </div>
        <IconButton
          onClick={showMenuOptions}
          css={`
            position: absolute;
            right: 10px;
            top: 4px;
            padding: 4px;
            color: #231d2c;
          `}
        >
          <MoreVertIcon />
        </IconButton>
      </Link>
      {menuOptionsDisplay && (
        <MenuOptions
          id={props.id}
          handleModal={props.handleModal}
          setModalType={props.setModalType}
          showMenuOptions={showMenuOptions}
          menuOptionsDisplay={menuOptionsDisplay}
        />
      )}
    </div>
  );
}
