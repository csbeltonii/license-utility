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
    <div className="d-flex align-items-center">
      <div className="m-2">{instance.getActiveAccount()?.username}</div>
      <PrimaryButton onClick={handleSignOut} className="btn">
        Sign Out
      </PrimaryButton>
    </div>
  );
};
