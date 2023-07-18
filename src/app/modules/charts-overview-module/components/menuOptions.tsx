import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ReactComponent as DuplicateIcon } from "app/modules/charts-overview-module/assets/copy-icon.svg";

export default function MenuOptions(props: {
  showMenuOptions: (id?: string) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  handleModal: (id: string) => void;
  id: string;
}) {
  return (
    <div>
      <div
        css={`
          top: 0;
          left: 0;
          z-index: 1;
          width: 100vw;
          height: 100vh;
          position: fixed;
        `}
        onClick={() => props.showMenuOptions()}
      />
      <div
        css={`
          top: 3%;
          right: 12%;
          z-index: 2;

          height: 38px;
          width: 104px;
          position: absolute;
          background: #cfd4da;
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          a {
            color: #262c34;
            margin-top: 4px;
          }
          button {
            padding: 4px;
            color: #262c34;
            font-size: 24px;
            :hover {
              background: transparent;
            }
          }
        `}
      >
        <div>
          <Link to={`/report/${props.id}/edit`}>
            <Tooltip title="Edit">
              <EditIcon
                color="inherit"
                css={`
                  margin-top: 4px;
                `}
              />
            </Tooltip>
          </Link>
        </div>
        <div>
          <IconButton
            onClick={() => {
              props.setModalType("duplicate");
              props.handleModal(props.id);
            }}
          >
            <Tooltip title="Duplicate">
              <DuplicateIcon />
            </Tooltip>
          </IconButton>
        </div>

        <div>
          <IconButton
            onClick={() => {
              props.setModalType("delete");
              props.handleModal(props.id);
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
