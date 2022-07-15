import React from "react";
// @ts-ignore
import Carousel from "react-grid-carousel";
import { useMediaQuery } from "@material-ui/core";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import {
  themeCarouselContainerCss,
  arrowLeftCss,
  arrowRightCss,
} from "app/modules/landing-module/components/ThemeCarousel/style";
import { ThemeCard } from "app/modules/landing-module/components/ThemeCard";
import {
  MockData,
  CardProps,
} from "app/modules/landing-module/components/mockData";

export function ThemesCarousel() {
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  return (
    <div css={themeCarouselContainerCss(isSmallScreen)}>
      <Carousel
        cols={isSmallScreen ? 2 : 3}
        rows={1}
        hideArrow={isSmallScreen ? true : undefined}
        showDots={isSmallScreen ? true : undefined}
        containerStyle={{ width: "100%" }}
        arrowLeft={
          <div css={arrowLeftCss}>
            <ArrowForwardIcon />
          </div>
        }
        arrowRight={
          <div css={arrowRightCss}>
            <ArrowForwardIcon />
          </div>
        }
      >
        {MockData.map((data: CardProps) => (
          <Carousel.Item key={data.cardTitle}>
            <ThemeCard {...data} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
