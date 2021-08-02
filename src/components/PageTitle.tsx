/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <div
      css={css`
        font-size: 15px;
        font-weight: bold;
        margin: 10px 0 5px;
        text-align: center;
        text-transform: uppercase;
      `}
    >
      <h1 className="h1">{title}</h1>
    </div>
  );
};

export default PageTitle;
