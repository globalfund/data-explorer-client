import { useState, useEffect } from "react";

type LoadDataFunction = (searchStr: string, sortBy: string) => void;

export const useInfinityScroll = (
  callback: LoadDataFunction,
  observerTarget: React.MutableRefObject<null>,
  searchStr: string,
  sortByStr: string
) => {
  useEffect(() => {
    //handle infinity scroll with IntersectionObserver api

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback(searchStr, sortByStr);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, []);
};
