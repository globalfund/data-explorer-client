import React from "react";
import TourStart from "app/components/Dialogs/TourGuide/tourStart";
import RowFrameIntro from "app/components/Dialogs/TourGuide/rowFrameIntro";
import SelectStructure from "./selectStructure";
import TourEnd from "./tourEnd";
import { useRecoilState } from "recoil";
import { reportCreationTourStepAtom } from "app/state/recoil/atoms";
import useCookie from "@devhammed/use-cookie";

export default function TourGuide() {
  const [reportCreationTourStep, setReportCreationTourStep] = useRecoilState(
    reportCreationTourStepAtom
  );
  const [cookie, setCookie] = useCookie("tourGuide", "true");
  const [open, setOpen] = React.useState(cookie);

  function handleClose() {
    setCookie("false", {
      expires: 31536000 * 20,
      domain: "",
      path: "",
      secure: false,
      httpOnly: false,
      maxAge: 0,
      sameSite: "",
    });
    setOpen(!open);
  }

  const displayTourStep = () => {
    switch (reportCreationTourStep) {
      case 0:
        return (
          <TourStart
            setStep={setReportCreationTourStep}
            open={open}
            handleClose={handleClose}
          />
        );
      case 1:
        return (
          <RowFrameIntro
            setStep={setReportCreationTourStep}
            handleClose={handleClose}
          />
        );
      case 2:
        return <SelectStructure handleClose={handleClose} />;
      case 3:
        return <TourEnd handleClose={handleClose} />;
      default:
        return;
    }
  };

  return <>{displayTourStep()}</>;
}
