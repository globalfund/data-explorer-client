import { PageHeader } from "app/components/PageHeader";
import { tabs } from "app/components/Search/components/results/styles";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { dataSetsCss } from "app/modules/datasets-module/style";
import React, { useState } from "react";
import { stepcss } from "../style";
import AddDatasetFragment from "./addDatasetFragment";
import MetaData from "./metaData";
import Processing from "./processing";
import PreviewFragment from "./previewFragment";
import FinishedFragment from "./finishedFragment";
import { Container } from "@material-ui/core";

export default function DatasetUploadSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Upload",
    "Description",
    "Processing Data",
    "Preview",
    "Finished",
  ];
  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
    if (newActiveStep === 1) {
      return;
    }
    if (newActiveStep > steps.length - 1) {
      setActiveStep(0);
      return;
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      const newActiveStep = activeStep - 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleMetaForm = () => {
    handleNext();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise resolved after 5 seconds");
      }, 5000);
    });

    promise
      .then((result) => {
        setActiveStep(3);
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("stepp", activeStep);

  const currentStep = () => {
    switch (activeStep) {
      case 0:
        return <AddDatasetFragment handleNext={handleNext} />;
      case 1:
        return <MetaData handleNext={handleMetaForm} handleBack={handleBack} />;
      case 2:
        return <Processing />;
      case 3:
        return <PreviewFragment handleNext={handleNext} />;
      case 4:
        return <FinishedFragment />;
      default:
        return <AddDatasetFragment handleNext={handleNext} />;
    }
  };

  return (
    <Container maxWidth="lg">
      {/* <PageHeader title="" /> */}
      <div css={stepcss}>
        {steps.map((tab, index) => (
          <div
            css={`
              display: flex;
              align-items: center;
              gap: 1rem;
            `}
            key={index}
          >
            {index === 0 ? (
              ""
            ) : (
              <div
                css={`
                  border: 1px solid
                    ${index <= activeStep ? "#6061e5" : "#231D2C"};
                  width: 80px;
                `}
              />
            )}
            <div
              css={`
                height: 27px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${index <= activeStep ? "#dadaf8" : "#E4E4E4"};
                border-radius: 32px;
                width: max-content;
                padding: 5px 16px;
                font-weight: ${index === activeStep && "bold"};
                border: ${index === activeStep && "1px solid #6061E5"};
              `}
            >
              {" "}
              {tab}
            </div>
          </div>
        ))}
      </div>
      <PageTopSpacer />

      <div>{currentStep()}</div>
    </Container>
  );
}
