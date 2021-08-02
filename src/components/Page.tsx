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
      css={css`
        margin: 50px auto 20px auto;
        padding: 30px 20px;
        max-width: 1200px;
        background-color: #f7f8fa;
      `}
    >
      {<PageTitle title={title} />}
      {children}
    </div>
  );
};

export default Page;
