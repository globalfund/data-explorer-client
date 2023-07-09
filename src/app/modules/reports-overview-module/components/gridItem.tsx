import { useState } from "react";
import { appColors } from "app/theme";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import DuplicateIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, Tooltip } from "@material-ui/core";
import { ReactComponent as DuplicateIcon } from "app/modules/reports-module/assets/copy-icon.svg";
import MenuOptions from "./menuOptions";

export function GridItem(props: {
  link: string;
  handleModal: (id: string) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  title: { __html: any };
  description: { __html: any };
  iconLinks?: {
    link: string;
    icon: React.ReactElement;
  }[];
}) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = useState(false);

  const showMenuOptions = () => {
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };
  return (
    <div
      css={`
        padding: 16px;
        height: 125px;
        background: #f1f3f5;
        position: relative;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
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
      <div dangerouslySetInnerHTML={props.title} />
      <div dangerouslySetInnerHTML={props.description} />
      {props.iconLinks && (
        <div
          css={`
            gap: 20px;
            bottom: 20px;
            position: absolute;
            display: flex;
            flex-direction: row;
            align-items: center;

            > a {
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
            }
          `}
        >
          {props.iconLinks.map((iconLink, index) => (
            <Link to={iconLink.link} key={index}>
              {iconLink.icon}
            </Link>
          ))}
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
        <p>Last edited - 11/10/2022</p>
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
      {menuOptionsDisplay && (
        <MenuOptions
          setModalType={props.setModalType}
          showMenuOptions={showMenuOptions}
          handleModal={props.handleModal}
          menuOptionsDisplay={menuOptionsDisplay}
          id={props.id}
        />
      )}
    </div>
  );
}
