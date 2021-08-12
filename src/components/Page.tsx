/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import PageTitle from "./PageTitle";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Page = ({ children, title }: Props) => {
  return (
    <div
      className="container"
      id="dealer-list"
      css={css`
        background-color: white;
        padding: 20px;
      `}
    >
      {<PageTitle title={title} />}
      {children}
    </div>
  );
};

export default Page;
