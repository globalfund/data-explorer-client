import React from "react";
// @ts-ignore
import Carousel from "react-grid-carousel";

import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";

interface DatasetCarouselProps {}

const griditem = (content: React.ReactElement) => (
  <div
    css={`
      padding: 8px;
      height: 210px;
      background: #fff;
      border-radius: 20px;
    `}
  >
    {content}
  </div>
);

export function DatasetCarousel(props: DatasetCarouselProps) {
  return (
    <div
      css={`
        width: 100%;

        > div {
          > div:nth-of-type(2) {
            margin: 0;
          }
        }
      `}
    >
      <Carousel
        cols={3}
        rows={1}
        gap={10}
        containerStyle={{ width: "100%" }}
        arrowLeft={
          <div
            css={`
              width: 30px;
              left: -40px;
              height: 30px;
              display: flex;
              position: absolute;
              align-items: center;
              top: calc(50% - 15px);
              justify-content: center;

              &:hover {
                cursor: pointer;
                border-radius: 50%;
                background: #98a1aa;
              }

              > svg {
                transform: rotate(-180deg);
              }
            `}
          >
            <ArrowForwardIcon />
          </div>
        }
        arrowRight={
          <div
            css={`
              width: 30px;
              height: 30px;
              right: -40px;
              display: flex;
              position: absolute;
              align-items: center;
              top: calc(50% - 15px);
              justify-content: center;

              &:hover {
                cursor: pointer;
                border-radius: 50%;
                background: #98a1aa;
              }
            `}
          >
            <ArrowForwardIcon />
          </div>
        }
      >
        <Carousel.Item>{griditem(<>Dataset A</>)}</Carousel.Item>
        <Carousel.Item>{griditem(<>Dataset B</>)}</Carousel.Item>
        <Carousel.Item>{griditem(<>Dataset C</>)}</Carousel.Item>
        <Carousel.Item>{griditem(<>Dataset D</>)}</Carousel.Item>
        <Carousel.Item>{griditem(<>Dataset E</>)}</Carousel.Item>
        <Carousel.Item>{griditem(<>Dataset F</>)}</Carousel.Item>
      </Carousel>
    </div>
  );
}
