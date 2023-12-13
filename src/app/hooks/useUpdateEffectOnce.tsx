import React from "react";

export function useUpdateEffectOnce(
  effect: Function,
  dependencies: Array<any>
) {
  const isInitialMount = React.useRef(true);
  const [didRunOnFirstUpdate, setDidRunOnFirstUpdate] = React.useState(false);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    if (!didRunOnFirstUpdate || isInitialMount.current) {
      setDidRunOnFirstUpdate(true);
      effect();
    }
  }, [dependencies]);
}
