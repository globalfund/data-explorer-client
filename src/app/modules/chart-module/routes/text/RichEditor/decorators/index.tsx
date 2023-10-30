import { CompositeDecorator, ContentBlock, ContentState } from "draft-js";
import React from "react";
type Decorator = {
  contentState: ContentState;
  entityKey: string;
  children: string;
};

export default function strategy(
  block: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  block.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

export const LinkDecorator = ({
  contentState,
  entityKey,
  children,
  ...props
}: Decorator) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      css={`
        color: #6061e5;
      `}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export const linkDecorator = new CompositeDecorator([
  {
    strategy: strategy,
    component: LinkDecorator,
  },
]);
