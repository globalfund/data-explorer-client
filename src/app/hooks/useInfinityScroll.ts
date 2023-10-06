import { useState, useEffect } from "react";
export const useInfinityScroll = (
  observerTarget: React.MutableRefObject<null>
) => {
  const [isObserved, setIsObserved] = useState(false);

  useEffect(() => {
    //handle infinity scroll with IntersectionObserver api

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsObserved(true);
        } else {
          setIsObserved(false);
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
  return { isObserved };
};
