import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import CheckIcon from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { useStoreActions } from "app/state/store/hooks";
import { PageLoader } from "app/modules/common/page-loader";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    minWidth: 200,
  },
}));

export default function DatasetUploadModule() {
  useTitle("DataXplorer - Dataset Upload");

  const [name, setName] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("General");
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [submitEnabled, setSubmitEnabled] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<FileList | null>(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );

  const onSubmit: any = async () => {
    if (
      name.length > 0 &&
      description.length > 0 &&
      category.length > 0 &&
      selectedFile
    ) {
      const datasetValues = {
        name,
        description,
        public: isPublic,
        category,
      };
      // Post the dataset
      setUploading(true);
      axios
        .post(`${process.env.REACT_APP_API}/datasets`, datasetValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // if the dataset was created successfully, post the file to the server
          const formData = new FormData();
          let file = selectedFile[0];
          let filename = "dx" + response.data.id;
          formData.append(filename, file);
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
            })
            .catch((error) => {
              console.debug("Dataset upload error", error);
              setUploading(false);
              setUploadSuccess(false);
              setSelectedFile(null);
              setErrorMessage("The file could not be uploaded, make sure it is less than 40MB, and of type XLSX, CSV, JSON or XML.");
              axios
                .delete(`${process.env.REACT_APP_API}/datasets/${response.data.id}`)
                .then(() => {
                  loadDatasets({ storeInCrudData: true });
                })
                .catch((error) => console.log(error));
            });
        })
        .catch((error) => {
          console.debug("Dataset creation error", error);
          setUploading(false);
          setUploadSuccess(false);
        });
    }
  };

  React.useEffect(() => {
    setSubmitEnabled(
      name.length > 0 &&
        description.length > 0 &&
        category.length > 0 &&
        selectedFile !== null
    );
  }, [name, description, category, selectedFile]);

  const classes = useStyles();

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        input[type="text"] {
          padding: 18.5px 14px;
        }
      `}
    >
      <PageTopSpacer />
      {uploading && <PageLoader />}
      <h1
        css={`
          font-size: 48px;
        `}
      >
        Connect Your Data
      </h1>
      {!uploading && !uploadSuccess && (
        <React.Fragment>
          <p>
            You can upload JSON or CSV data files.
            <br />
            Your dataset will become available after being processed, which will
            roughly take around half a minute.
          </p>
          <div
            className={classes.root}
            css={`
              width: 100%;
              display: flex;
              flex-direction: column;
            `}
          >
            <TextField
              required
              fullWidth
              value={name}
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="datasetCategory">Dataset category</InputLabel>
                <Select
                  value={category}
                  label="Dataset category"
                  labelId="datasetCategory"
                  onChange={(e) => setCategory(e.target.value as string)}
                >
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControlLabel
              value={isPublic}
              labelPlacement="start"
              label="Publicly visible"
              onChange={(e, v) => setIsPublic(v)}
              control={<Checkbox color="primary" />}
              css={`
                justify-content: start;

                > span {
                  font-size: 1rem;
                }
              `}
            />
            <div>
              <label htmlFor="fileUpload">
                <Button
                  color="primary"
                  component="span"
                  variant={selectedFile ? "contained" : "outlined"}
                  startIcon={selectedFile ? <CheckIcon /> : <CloudUploadIcon />}
                >
                  {selectedFile ? "Done" : "Upload"}
                </Button>
              </label>
              <input
                required
                type="file"
                id="fileUpload"
                name="fileUpload"
                accept=".json,.csv,.xlsx"
                onChange={(e) => setSelectedFile(e.target.files)}
                css={`
                  display: none;
                `}
              />
            </div>
            <div
              css={`
                display: flex;
                justify-content: flex-end;
              `}
            >
              <Button
                color="primary"
                onClick={onSubmit}
                variant="contained"
                disabled={!submitEnabled}
              >
                Submit
              </Button>
            </div>
          </div>
          <div>{errorMessage}</div>
        </React.Fragment>
      )}
      {uploadSuccess && (
        <div
          css={`
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <p>Your dataset has been created</p>
          <Button
            color="primary"
            component={Link}
            variant="contained"
            to="/data-themes/new/initial"
          >
            Create data theme
          </Button>
        </div>
      )}
    </div>
  );
}
