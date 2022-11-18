import React from "react";
import axios from "axios";
import useTitle from "react-use/lib/useTitle";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
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
import { Link } from "react-router-dom";

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

  const [uploading, setUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );

  const onSubmit: any = async (event: any) => {
    event.preventDefault();
    const datasetValues = {
      name: event.target.name.value,
      description: event.target.description.value,
      public: event.target.public.checked,
      category: event.target.datasetCategory.value,
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
        let file = event.target.fileUpload.files[0];
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
          });
      })
      .catch((error) => {
        console.debug("Dataset creation error", error);
        setUploading(false);
        setUploadSuccess(false);
      });
  };

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
          <form
            autoComplete="off"
            className={classes.root}
            onSubmit={(event) => onSubmit(event)}
            css={`
              width: 100%;
              display: flex;
              flex-direction: column;
            `}
          >
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              required
              fullWidth
            />
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="datasetCategory">Dataset category</InputLabel>
                <Select
                  label="Dataset category"
                  name="datasetCategory"
                  labelId="datasetCategory"
                >
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControlLabel
              labelPlacement="start"
              label="Publicly visible"
              control={<Checkbox name="public" color="primary" />}
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
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
              <input
                required
                type="file"
                id="fileUpload"
                name="fileUpload"
                accept=".json,.csv"
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
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>
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
