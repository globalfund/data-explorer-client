import React from "react";

interface UseCompWillMountProps {
  action: () => void;
}

export function useComponentWillMount(props: UseCompWillMountProps) {
  const willMount = React.useRef(true);

  if (willMount.current) props.action();

  willMount.current = false;

  return null;
}
