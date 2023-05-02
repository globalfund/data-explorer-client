import DeleteAccountDialog from "app/components/Dialogs/deleteAccountDialog";
import { PrimaryButton } from "app/components/Styled/button";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Settings() {
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const history = useHistory();

  const handleDelete = () => {
    setModalDisplay(false);
    setEnableButton(false);
    history.push("/");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "DELETE") {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };
  return (
    <>
      <div
        css={`
          width: 70%;
        `}
      >
        <h4
          css={`
            font-weight: 700;
            font-size: 24px;
            color: #6061e5;
          `}
        >
          Settings
        </h4>
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <p>Account</p>
          <div
            css={`
              width: 60%;
              color: #ffffff;
            `}
          >
            <PrimaryButton
              dark
              type="button"
              onClick={() => setModalDisplay(true)}
            >
              Delete account
            </PrimaryButton>
          </div>
        </div>
      </div>
      <DeleteAccountDialog
        enableButton={enableButton}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
    </>
  );
}
