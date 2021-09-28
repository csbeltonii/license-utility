import { FC } from "react";
import { PrimaryButton } from "./Styles/Styles";
import { useForm } from "react-hook-form";
import { Company } from "../data/companies";
import { SilentRequest } from "@azure/msal-browser";
import { updateCompany } from "../data/companies";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

type FormData = {
  companyId: number;
  licenseCount: number;
  mobileLicenseCount: number;
  trialLicenseCount: number;
};

type Props = {
  company: Company | undefined;
};
const LicenseForm: FC<Props> = ({ company }) => {
  const { register, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
  });

  const { instance } = useMsal();
  const navigate = useNavigate();

  const submitForm = async (data: FormData) => {
    const account = instance.getAllAccounts()[0];
    const user = account.name;

    const silentRequest: SilentRequest = {
      scopes: ["api://a22e7296-106f-4a00-af8d-f86edb386a1b/api_access"],
      account: account,
    };

    const token = await instance.acquireTokenSilent(silentRequest);

    await updateCompany(
      {
        companyId: data.companyId,
        accountNumber: 0,
        licenses: data.licenseCount,
        licensesMobileCount: data.mobileLicenseCount,
        trialLicenses: data.trialLicenseCount,
        changedBy: user,
      },
      token.accessToken
    );

    navigate("/");
  };

  return (
    <>
      <h5>Update Licenses</h5>
      <form onSubmit={handleSubmit(submitForm)} className="form-horizontal">
        <input
          ref={register}
          defaultValue={company?.companyId}
          type="text"
          name="companyId"
          id="companyId"
          hidden
          readOnly
        />
        <div className="row mb-2">
          <div className="col">
            <label className="form-label" htmlFor="licenseCount">
              Desktop
            </label>
            <input
              type="number"
              min="0"
              ref={register}
              defaultValue={company?.licenses}
              id="licenseCount"
              name="licenseCount"
              className="form-control col-2"
            />
          </div>
          <div className="col">
            <label className="form-label" htmlFor="mobileLicenseCount">
              Mobile
            </label>
            <input
              ref={register}
              defaultValue={company?.licensesMobileCount}
              type="number"
              min="0"
              id="mobileLicenseCount"
              name="mobileLicenseCount"
              className="form-control col-2"
            />
          </div>
          <div className="col">
            <label className="form-label" htmlFor="trialLicenseCount">
              Trial
            </label>
            <input
              ref={register}
              defaultValue={company?.trialLicenses}
              type="number"
              min="0"
              id="trialLicenseCount"
              name="trialLicenseCount"
              className="form-control col-2"
            />
          </div>
        </div>
        <div className="row justify-content-end m-1">
          <PrimaryButton className="btn col-2" type="submit" id="btn-submit">
            Submit
          </PrimaryButton>
        </div>
      </form>
    </>
  );
};

export default LicenseForm;
