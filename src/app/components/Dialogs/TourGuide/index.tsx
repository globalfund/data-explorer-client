import React from "react";
import TourStart from "app/components/Dialogs/TourGuide/tourStart";
import RowFrameIntro from "app/components/Dialogs/TourGuide/rowFrameIntro";
import SelectStructure from "./selectStructure";
import TourEnd from "./tourEnd";
import { useRecoilState } from "recoil";
import { reportCreationTourStepAtom } from "app/state/recoil/atoms";
import useCookie from "@devhammed/use-cookie";

export default function TourGuide(props: {
  reportType: "basic" | "advanced" | "ai";
  toolBoxOpen: boolean;
}) {
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

  const displayBasicReportTourStep = () => {
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
            open={open}
            toolBoxOpen={props.toolBoxOpen}
            reportType={props.reportType}
          />
        );
      case 2:
        return (
          <SelectStructure
            handleClose={handleClose}
            open={open}
            toolBoxOpen={props.toolBoxOpen}
          />
        );
      case 3:
        return (
          <TourEnd
            handleClose={handleClose}
            open={open}
            reportType={props.reportType}
            toolBoxOpen={props.toolBoxOpen}
          />
        );
      default:
        return;
    }
  };
  const displayAdvancedReportTourStep = () => {
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
            open={open}
            toolBoxOpen={props.toolBoxOpen}
            reportType={props.reportType}
          />
        );
      case 2:
        return (
          <TourEnd
            handleClose={handleClose}
            open={open}
            reportType={props.reportType}
            toolBoxOpen={props.toolBoxOpen}
          />
        );
      case 3:
      default:
        return;
    }
  };

  return (
    <>
      {props.reportType === "basic" && displayBasicReportTourStep()}
      {props.reportType === "advanced" && displayAdvancedReportTourStep()}
    </>
  );
}
