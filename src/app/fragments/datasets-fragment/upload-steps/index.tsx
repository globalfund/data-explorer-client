import { PageHeader } from "app/components/PageHeader";
import { tabs } from "app/components/Search/components/results/styles";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { dataSetsCss } from "app/modules/datasets-module/style";
import React, { useState } from "react";
import { stepcss } from "../style";
import AddDatasetFragment from "./addDatasetFragment";
import MetaData from "./metaData";
import Processing from "./processing";
import ResultFragment from "./resultFragment";

export default function DatasetUploadSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Upload",
    "Description",
    "Processing Data",
    "Result",
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
    // history.push(steps[newActiveStep].path);
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
        return <MetaData handleNext={handleMetaForm} />;
      case 2:
        return <Processing />;
      case 3:
        return <ResultFragment />;
    }
  };

  return (
    <div>
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

      <div
        css={`
          /* background: yellow; */
        `}
      >
        {currentStep()}
      </div>
    </div>
  );
}
