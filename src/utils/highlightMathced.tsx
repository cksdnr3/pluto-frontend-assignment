import { CSSProperties, ReactNode } from "react";

export const highlightMatched = (
  text: string,
  textToSearch: string,
  style?: CSSProperties
) => {
  const reg = new RegExp(textToSearch, "gi");
  const matched = text.match(reg);
  return text.split(reg).reduce((acc, value, index) => {
    if (index === 0) return [value];
    return acc.concat([
      <span key={index} style={style}>
        {matched && matched[index - 1]}
      </span>,
      value,
    ]);
  }, [] as (ReactNode | string)[]);
};
