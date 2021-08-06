/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <div className="text-center">
      <h1 className="display-6">{title}</h1>
    </div>
  );
};

export default PageTitle;
