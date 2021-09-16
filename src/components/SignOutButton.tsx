import { useMsal } from "@azure/msal-react";
import { PrimaryButton } from "./Styles/Styles";
import { useNavigate } from "react-router";

export const SignOutButton = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleSignOut = () => {
    instance.logout();
    navigate("/");
  };

  return (
    <PrimaryButton onClick={handleSignOut} className="btn">
      Sign Out
    </PrimaryButton>
  );
};
