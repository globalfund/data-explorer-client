import React from "react";
import axios from "axios";
import { useUpdateEffect } from "react-use";
import Container from "@material-ui/core/Container";
import { useStoreActions } from "app/state/store/hooks";
import { useChartsRawData } from "app/hooks/useChartsRawData";
import { stepcss } from "app/fragments/datasets-fragment/style";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import MetaData from "app/fragments/datasets-fragment/upload-steps/metaData";
import Processing from "app/fragments/datasets-fragment/upload-steps/processing";
import PreviewFragment from "app/fragments/datasets-fragment/upload-steps/previewFragment";
import FinishedFragment from "app/fragments/datasets-fragment/upload-steps/finishedFragment";
import AddDatasetFragment from "app/fragments/datasets-fragment/upload-steps/addDatasetFragment";

export default function DatasetUploadSteps() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [processingError, setProcessingError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [datasetId, setDatasetId] = React.useState("");
  const [formDetails, setFormDetails] = React.useState({
    name: "",
    description: "",
    category: "General",
    public: false,
  });

  const steps = [
    "Upload",
    "Description",
    "Processing Data",
    "Preview",
    "Finished",
  ];

  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );

  const { loadDataset, sampleData, dataTotalCount, dataStats } =
    useChartsRawData({
      visualOptions: () => {},
      setVisualOptions: () => {},
      setChartFromAPI: () => {},
      chartFromAPI: null,
    });

  useUpdateEffect(() => {
    loadDataset(`chart/sample-data/${datasetId}`);
  }, [datasetId]);

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

  const onSubmit = async () => {
    // Post the dataset
    handleNext();
    setUploading(true);
    axios
      .post(`${process.env.REACT_APP_API}/datasets`, formDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // if the dataset was created successfully, post the file to the server
        const formData = new FormData();
        let file = selectedFile;
        let filename = "dx" + response.data.id;
        formData.append(filename, file as File);
        axios
          .post(`${process.env.REACT_APP_API}/files`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((_) => {
            setUploading(false);
            setUploadSuccess(true);
            loadDatasets({ storeInCrudData: true });
            setDatasetId(response.data.id);
            setActiveStep(3);
          })
          .catch((error) => {
            console.debug("Dataset upload error", error);
            setProcessingError(true);
            setUploading(false);
            setUploadSuccess(false);
            setSelectedFile(null);
            setErrorMessage(
              "The file could not be uploaded, make sure it is less than 40MB, and of type XLSX, CSV, JSON or XML."
            );
            axios
              .delete(
                `${process.env.REACT_APP_API}/datasets/${response.data.id}`
              )
              .then(() => {
                loadDatasets({ storeInCrudData: true });
              })
              .catch((error) => console.log(error));
          });
      })
      .catch((error) => {
        console.debug("Dataset creation error", error);
        setProcessingError(true);

        setUploading(false);
        setUploadSuccess(false);
      });
  };

  const currentStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <AddDatasetFragment
            handleNext={handleNext}
            setFile={setSelectedFile}
            disabled={false}
          />
        );
      case 1:
        return (
          <MetaData
            onSubmit={onSubmit}
            handleBack={handleBack}
            formDetails={formDetails}
            setFormDetails={setFormDetails}
          />
        );
      case 2:
        return (
          <Processing
            setProcessingError={setProcessingError}
            processingError={processingError}
          />
        );
      case 3:
        return (
          <PreviewFragment
            handleNext={handleNext}
            data={sampleData}
            stats={dataStats}
            dataTotalCount={dataTotalCount}
          />
        );
      case 4:
        return (
          <FinishedFragment
            data={sampleData}
            stats={dataStats}
            datasetId={datasetId}
          />
        );
      default:
        return (
          <AddDatasetFragment
            handleNext={handleNext}
            setFile={setSelectedFile}
            disabled={false}
          />
        );
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
            <button
              type="button"
              onClick={() => {
                if (activeStep > 0) {
                  setActiveStep(index);
                }
              }}
              css={`
                outline: none;
                border: none;
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
            </button>
          </div>
        ))}
      </div>
      <PageTopSpacer />
      <div>{currentStep()}</div>
    </Container>
  );
}
