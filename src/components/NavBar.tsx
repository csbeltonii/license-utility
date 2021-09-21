/**@jsxImportSource @emotion/react/ */
import { css } from "@emotion/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import LoginLogoutButton from "./LoginLogoutButton";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const NavBar: FC = () => {
  return (
    <div className="container bg-white p-2">
      <div
        className="d-flex justify-content-between"
        css={css`
          padding: 10px 20px 10px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        `}
      >
        <Link to="/" style={linkStyle}>
          <h1 className="">Everlogic License Utility</h1>
        </Link>
        <div className="align-self-center">
          <LoginLogoutButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
