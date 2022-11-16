import React from "react";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";

export default function DatasetUploadModule() {
  const onSubmit: any = (event: any) => {
    console.log(
      "Submitted", 
      event.target.name.value, 
      event.target.description.value,
      event.target.datasetCategory.value,
      event.target.file.value
    );
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
      <form onSubmit={(event) => onSubmit(event)} action="/">
        <label>Dataset name: </label><input name="name" type="text" placeholder="Type here..." /><br />
        <label>Dataset description: </label><input name="description" type="text" placeholder="Type here..." /><br />
        <label>Dataset category: </label><select name="datasetCategory"><option value="general">General</option><option value="other">Other</option></select><br />
        <label>Dataset name: </label><input name="otherName" type="text" placeholder="Type here..." /><br />
        <label>Dataset upload</label><input name="file" type="file" /><br />
        <input type="submit" value="Upload your dataset" />
      </form>
    </div>
  );
}