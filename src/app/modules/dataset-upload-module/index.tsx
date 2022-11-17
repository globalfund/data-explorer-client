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
  const createDataset = useStoreActions(
    (actions) => actions.dataThemes.DatasetCreate.post
  );
  const createdDatasetData = useStoreState(
    (state) =>
      (state.dataThemes.DatasetCreate.crudData ??
        emptyDatasetAPI) as DatasetAPIModel
  );
  const createDatasetLoading = useStoreState(
    (state) =>
      state.dataThemes.DatasetCreate.loading
  );
  const createDatasetSuccess = useStoreState(
    (state) => state.dataThemes.DatasetCreate.success
  );
  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );

  const onSubmit: any = async (event: any) => {
    // Create a datatheme
    createDataset({
      values: {
        "name": event.target.name.value,
        "description": event.target.description.value,
        "public": event.target.public.checked,
        "category": event.target.datasetCategory.value
      },
    });
  }

  React.useEffect(() => {
    if (createDatasetSuccess) {
      // Reload the datasets for the data theme builder
      loadDatasets({storeInCrudData: true});
      // rename the uploaded file
      const newName = 'dx' + createdDatasetData.id
      console.log("LFM::The uploaded file's name should be: " + newName)
      // move the uploaded file to the DX-backend/data folder.
    }
  }, [createDatasetSuccess, createDatasetLoading, createdDatasetData])

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
      { createDatasetLoading &&
        <PageLoader />
      }
      { !createDatasetLoading && createdDatasetData.id === "" &&
        <React.Fragment>
          <p>
            Please upload your JSON or CSV file. Your dataset will become available after being processed, which will roughly take around half a minute.
          </p>
          <form action="/fileUpload" onSubmit={(event) => onSubmit(event)} method="post">
            <label>Dataset name: </label><input name="name" type="text" placeholder="Type here..." required /><br />
            <label>Dataset description: </label><input name="description" type="text" placeholder="Type here..." required /><br />
            <label>Dataset category: </label><select name="datasetCategory">
              <option value="general">General</option>
              <option value="other">Other</option>
            </select><br />
            <label>Publicly visible: </label><input name="public" type="checkbox" /><br />
            <label>Dataset upload</label><input name="fileUpload" type="file" accept=".json,.csv"/><br />
            <input type="submit" value="Upload your dataset" />
          </form>
        </React.Fragment>
      }
      { createDatasetSuccess && createdDatasetData.id !== "" &&
        <>
          <p>Your dataset has been created</p>
          <form action="/data-themes/new"><input type="submit" value="Create datatheme" ></input></form>
        </>
      }
    </div>
  );
}