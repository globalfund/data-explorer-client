import React from "react";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { PageLoader } from "app/modules/common/page-loader";
import {
  DatasetAPIModel,
  emptyDatasetAPI,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import axios, { AxiosResponse, AxiosError } from 'axios';

export default function DatasetUploadModule() {
  const [uploading, setUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );

  const onSubmit: any = async (event: any) => {
    event.preventDefault();
    const datasetValues = {
      "name": event.target.name.value,
      "description": event.target.description.value,
      "public": event.target.public.checked,
      "category": event.target.datasetCategory.value
    }
    // Post the dataset
    setUploading(true);
    axios
      .post(`${process.env.REACT_APP_API}/datasets`, datasetValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        // if the dataset was created successfully, post the file to the server
        const formData = new FormData();
        let file = event.target.fileUpload.files[0];
        let filename = 'dx'+response.data.id;
        formData.append(filename, file);
        axios
          .post(`${process.env.REACT_APP_API}/files`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(_ => {
            setUploading(false);
            setUploadSuccess(true);
            loadDatasets({storeInCrudData: true});
          })
          .catch(error => {
            console.debug("Dataset upload error", error)
            setUploading(false);
            setUploadSuccess(false);
          })
      })
      .catch(error => {
        console.debug("Dataset creation error", error)
        setUploading(false);
        setUploadSuccess(false);
      })
  }

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <PageTopSpacer />
      <h1>Dataset Upload</h1>
      { uploading &&
        <PageLoader />
      }
      { !uploading && !uploadSuccess &&
        <React.Fragment>
          <p>
            Please upload your JSON or CSV file. Your dataset will become available after being processed, which will roughly take around half a minute.
          </p>
          <form onSubmit={(event) => onSubmit(event)}>
            <label>Dataset name: </label><input name="name" type="text" placeholder="Type here..." required /><br />
            <label>Dataset description: </label><input name="description" type="text" placeholder="Type here..." required /><br />
            <label>Dataset category: </label><select name="datasetCategory">
              <option value="general">General</option>
              <option value="other">Other</option>
            </select><br />
            <label>Publicly visible: </label><input name="public" type="checkbox" /><br />
            <label>Dataset upload</label><input required name="fileUpload" type="file" accept=".json,.csv"/><br />
            <input type="submit" value="Upload your dataset" />
          </form>
        </React.Fragment>
      }
      { uploadSuccess &&
        <>
          <p>Your dataset has been created</p>
          <form action="/data-themes/new"><input type="submit" value="Create datatheme" ></input></form>
        </>
      }
    </div>
  );
}