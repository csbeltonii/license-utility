import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../utility/authConfig";
import { PrimaryButton } from "./Styles/Styles";
import { AuthenticationResult } from "@azure/msal-browser";
import { useNavigate } from "react-router";

export const SignInButton = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((response: AuthenticationResult) => {
        if (response.accessToken) {
          instance.setActiveAccount(response.account);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <PrimaryButton onClick={handleLogin} className="btn">
      Login
    </PrimaryButton>
  );
};
