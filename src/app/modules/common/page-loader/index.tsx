/* core */
import React from "react";
import styled from "styled-components/macro";
/* third-party */
import CircularProgress from "@material-ui/core/CircularProgress";

const Background = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: white;
`;

const Container = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const LoadingComp = styled.div`
  top: 0;
  left: 0;
  width: ${(props: { inLoader?: boolean }) =>
    props.inLoader ? "100%" : "100vw"};
  height: ${(props: { inLoader?: boolean }) =>
    props.inLoader ? "100%" : "100vh"};
  z-index: 100000;
  position: ${(props: { inLoader?: boolean }) =>
    props.inLoader ? "absolute" : "fixed"};
  background: rgba(0, 0, 0, 0.2);

  > div {
    height: ${(props: { inLoader?: boolean }) =>
      props.inLoader ? "100%" : "calc(100vh - 45px)"};
  }
`;

export const PageLoader = (props: { inLoader?: boolean }) => {
  return (
    <LoadingComp inLoader={props.inLoader}>
      <Container data-cy="general-loader" id="general-loader">
        <Background>
          <CircularProgress disableShrink />
        </Background>
      </Container>
    </LoadingComp>
  );
};
