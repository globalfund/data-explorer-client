import React from "react";
import Box from "@mui/material/Box";

const OpexInViewContext = React.createContext<boolean>(true);

export const useOpexInView = () => React.useContext(OpexInViewContext);

export const opexChartAnimationOptions = (reducedMotion: boolean) => ({
  animation: !reducedMotion,
  animationDuration: 2000,
  animationEasing: "cubicOut" as const,
  animationDelay: (idx: number) => 200 + idx * 60,
  animationDurationUpdate: 1000,
  animationEasingUpdate: "cubicOut" as const,
});

export const OpexAnimateInView: React.FC<React.PropsWithChildren> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref}>
      <OpexInViewContext.Provider value={visible}>
        {props.children}
      </OpexInViewContext.Provider>
    </Box>
  );
};
