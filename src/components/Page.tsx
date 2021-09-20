/** @jsxImportSource @emotion/react */
import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

import PageTitle from "./PageTitle";

interface Props {
  title: string;
  children: ReactNode;
}

const Page: FC<Props> = ({ children, title }) => {
  return (
    <div
      className="container"
      id="dealer-list"
      css={css`
        background-color: white;
        padding: 20px;
        height: 100vh;
      `}
    >
      {<PageTitle title={title} />}
      {children}
    </div>
  );
};

export default Page;
