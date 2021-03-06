/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const gray1 = "#383737";
export const gray2 = "#5c5a5a";
export const gray3 = "#857c81";
export const gray4 = "#b9b9b9";
export const gray5 = "#e3e2e2";
export const gray6 = "#f7f8fa";

export const primary1 = "#681c41";
export const primary2 = "#824c67";

export const accent1 = "#dbb365";
export const accent2 = "#efd197";

export const fontFamily = "'Segoe UI', 'Helvetica Neue',sans-serif";
export const fontSize = "16px";

const baseFieldCSS = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  :disabled {
    background-color: ${gray6};
  }
`;

export const Fieldset = styled.fieldset`
  margin: 10px auto 0 auto;
  padding: 30px;
  width: 350px;
  background-color: ${gray6};
  border-radius: 4px;
  border: 1px solid ${gray5};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

export const FieldContainer = styled.div`
  margin-bottom: 10px;
`;

export const FieldLabel = styled.label`
  font-weight: bold;
`;

export const FieldInput = styled.input`
  ${baseFieldCSS}
`;

export const PrimaryButton = styled.button`
  background-color: rgb(119, 184, 0);
`;

export const Table = styled.table``;

export const PageNumberIndicator = styled.span`
  margin: 0.375rem 0.75rem;
`;
