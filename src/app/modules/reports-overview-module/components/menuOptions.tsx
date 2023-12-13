import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as DuplicateIcon } from "app/modules/reports-overview-module/assets/copy-icon.svg";

interface Props {
  id: string;
  top?: string;
  right?: string;
  menuOptionsDisplay: boolean;
  handleModal: (modalType: string) => void;
  showMenuOptions: React.MouseEventHandler<HTMLElement>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

export default function MenuOptions(props: Props) {
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
        onClick={props.showMenuOptions}
      />
      <div
        css={`
          top: ${props.top ? props.top : "3%"};
          right: ${props.right ? props.right : "12%"};
          z-index: 2;

          height: 38px;
          width: ${props.menuOptionsDisplay ? "104px" : "0px"};
          opacity: ${props.menuOptionsDisplay ? "1" : "0"};
          transition: width 0.3s ease-in-out;
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
          <IconButton>
            <Tooltip title="Edit">
              <Link to={`/report/${props.id}/edit`}>
                <EditIcon
                  color="inherit"
                  css={`
                    margin-top: 4px;
                  `}
                />
              </Link>
            </Tooltip>
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.setModalType("duplicate");
              props.handleModal("duplicate");
            }}
          >
            <Tooltip title="Duplicate">
              <DuplicateIcon />
            </Tooltip>
          </IconButton>
        </div>

        <div>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.setModalType("delete");
              props.handleModal("delete");
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
