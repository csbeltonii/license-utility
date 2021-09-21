import { FC } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

const LoginLogoutButton: FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>{isAuthenticated === false ? <SignInButton /> : <SignOutButton />}</>
  );
};

export default LoginLogoutButton;
