import React from "react";
import moment from "moment";
import { appColors } from "app/theme";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuOptions from "app/modules/charts-overview-module/components/menuOptions";

interface Props {
  id: string;
  link: string;
  title: string;
  description: string;
  createdDate: string;
  viz: React.ReactNode;
  handleModal: (id: string) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

export function GridItem(props: Props) {
  const [menuOptionsDisplay, setMenuOptionsDisplay] = React.useState(false);

  const showMenuOptions = () => {
    setMenuOptionsDisplay(!menuOptionsDisplay);
  };

  return (
    <Link
      to={props.link}
      css={`
        width: 100%;
        padding: 16px;
        height: 125px;
        display: flex;
        background: #f1f3f5;
        border-radius: 10px;
        text-decoration: none;
        flex-direction: column;

        > div {
          color: #495057;
          font-weight: bold;
          line-height: 16px;

          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

          &:nth-of-type(2) {
            color: #495057;
            margin-top: 4px;
            font-size: 10px;
            font-weight: 400;
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
      <div
        css={`
          bottom: 16px;
          position: absolute;

          > svg {
            > path {
              fill: ${appColors.DATASETS_GRID.ICON_LINK_COLOR};
            }
            rect {
              fill: ${appColors.DATASETS_GRID.ICON_LINK_COLOR};
            }
          }
        `}
      >
        {props.viz}
      </div>
      <div
        css={`
          right: 20px;
          bottom: 16px;
          position: absolute;

          p {
            margin: 0;
            color: #495057;
            font-size: 10px;
            font-family: "GothamNarrow-Light";
          }
        `}
      >
        <p>{moment(props.createdDate).format("L")}</p>
      </div>
      <IconButton
        onClick={showMenuOptions}
        css={`
          top: 16px;
          right: 10px;
          padding: 4px;
          color: #231d2c;
          position: absolute;
        `}
      >
        <MoreVertIcon />
      </IconButton>
      {menuOptionsDisplay && (
        <MenuOptions
          setModalType={props.setModalType}
          showMenuOptions={showMenuOptions}
          handleModal={props.handleModal}
          id={props.id}
        />
      )}
    </Link>
  );
}
