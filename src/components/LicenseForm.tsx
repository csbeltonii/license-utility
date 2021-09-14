import { FC } from "react";
import { FieldInput, PrimaryButton } from "./Styles/Styles";
import { useForm } from "react-hook-form";
import { Company } from "../data/companies";

type FormData = {
  companyId: number;
  licenseCount: number;
  mobileLicenseCount: number;
  trialLicenseCount: number;
};

type Props = {
  company: Company | undefined;
  submitForm: () => void;
};
const LicenseForm: FC<Props> = ({ company, submitForm }) => {
  const { register, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
  });
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
