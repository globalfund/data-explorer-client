import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import ReplayIcon from "@material-ui/icons/Replay";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

function ResetBtn({ resetScale }) {
  return (
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      overlay={<Tooltip id={`tooltip-top`}>Reset domain</Tooltip>}
    >
      <span type="button" className="btn" onClick={resetScale}>
        <ReplayIcon fontSize="small" />
      </span>
    </OverlayTrigger>
  );
}

function InvertBtn({ invertScale }) {
  return (
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      overlay={<Tooltip id={`tooltip-top`}>Invert</Tooltip>}
    >
      <span type="button" className="btn" onClick={invertScale}>
        <SyncAltIcon fontSize="small" />
      </span>
    </OverlayTrigger>
  );
}

function LockBtn({ handleChangeLocked, locked }) {
  return (
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      overlay={
        <Tooltip id={`tooltip-top`}>{locked ? "Unlock" : "Lock"} scale</Tooltip>
      }
    >
      <span
        type="button"
        className={`btn ${locked ? "Xbtn-primary" : ""}`}
        onClick={() => handleChangeLocked(!locked)}
      >
        {locked ? (
          <LockOpenIcon fontSize="small" />
        ) : (
          <LockIcon fontSize="small" />
        )}
      </span>
    </OverlayTrigger>
  );
}

export { ResetBtn, InvertBtn, LockBtn };
