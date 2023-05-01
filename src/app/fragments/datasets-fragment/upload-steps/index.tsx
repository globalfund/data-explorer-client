import React from "react";
import Container from "@material-ui/core/Container";
import { stepcss } from "app/fragments/datasets-fragment/style";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import MetaData from "app/fragments/datasets-fragment/upload-steps/metaData";
import Processing from "app/fragments/datasets-fragment/upload-steps/processing";
import PreviewFragment from "app/fragments/datasets-fragment/upload-steps/previewFragment";
import FinishedFragment from "app/fragments/datasets-fragment/upload-steps/finishedFragment";
import AddDatasetFragment from "app/fragments/datasets-fragment/upload-steps/addDatasetFragment";

export default function DatasetUploadSteps() {
  const [activeStep, setActiveStep] = React.useState(0);

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
      <div css={stepcss}>
        {steps.map((tab, index) => (
          <div
            key={tab}
            css={`
              gap: 1rem;
              display: flex;
              align-items: center;
            `}
          >
            {index !== 0 && (
              <div
                css={`
                  width: 80px;
                  border: 1px solid
                    ${index <= activeStep ? "#6061e5" : "#231D2C"};
                `}
              />
            )}
            <div
              css={`
                height: 27px;
                display: flex;
                padding: 5px 16px;
                width: max-content;
                align-items: center;
                border-radius: 32px;
                justify-content: center;
                font-weight: ${index === activeStep && "bold"};
                border: ${index === activeStep && "1px solid #6061E5"};
                background: ${index <= activeStep ? "#dadaf8" : "#E4E4E4"};
              `}
            >
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
