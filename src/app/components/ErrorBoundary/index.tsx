import React from "react";
import Container from "@material-ui/core/Container";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({
  error,
  showDetails,
  setShowDetails,
  resetErrorBoundary,
}: {
  error: any;
  showDetails: boolean;
  resetErrorBoundary: (...args: any[]) => void;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onDetailsClick = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <Container
      maxWidth="lg"
      css={`
        width: 100%;
        height: 100vh;
        display: flex !important;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <div
        css={`
          padding: 40px;
          color: #78909c;
          font-size: 24px;
          border-radius: 5px;
          border: 2px #252c34 solid;
        `}
      >
        <p>
          Something went wrong{" "}
          <span role="img" aria-label="face-emoji">
            😬
          </span>
        </p>
        <div
          css={`
            cursor: pointer;
          `}
          onClick={onDetailsClick}
        >
          Click for details
        </div>
        <pre
          css={`
            text-wrap: balance;
            transition: all 0.3s ease-in-out;
            max-height: ${showDetails ? "1000px" : "0px"};
            visibility: ${showDetails ? "visible" : "hidden"};
          `}
        >
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          css={`
            padding: 9px 27px;
            height: 41px;
            border-radius: 30px;
            outline: none;
            border: none;
            color: #ffffff;
            font-family: "Inter", sans-serif;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            text-decoration: none;
            background: #252c34;

            :hover {
              opacity: 0.8;
              cursor: pointer;
            }
          `}
        >
          Try again
        </button>
      </div>
    </Container>
  );
};

export function ErrorBoundaryDX(props: { children: React.ReactNode }) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorFallback
          error={error}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
    >
      {props.children}
    </ErrorBoundary>
  );
}
