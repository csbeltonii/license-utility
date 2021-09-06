import { FC } from "react";
import { Company, updateCompany } from "../data/companies";
import { useForm } from "react-hook-form";
import { FieldInput } from "./Styles/Styles";
import { useNavigate } from "react-router-dom";
import LicenseChangeTable from "./LicenseChangeTable";

type FormData = {
  companyId: number;
  licenseCount: number;
  mobileLicenseCount: number;
  trialLicenseCount: number;
};

type Props = {
  company: Company;
  licenseChanges: [];
  submitForm: () => {};
};

const Dealer: FC<Props> = ({ company, licenseChanges }) => {
  const { register, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const submitForm = async (data: FormData) => {
    await updateCompany({
      companyId: data.companyId,
      companyName: "",
      accountNumber: 0,
      licenses: data.licenseCount,
      licensesMobileCount: data.mobileLicenseCount,
      trialLicenses: data.trialLicenseCount,
      licenseChanges: [],
    });

    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-around">
      <div className="m-3 p-3">
        <h5>Update Licenses</h5>
        <form onSubmit={handleSubmit(submitForm)} className="w-25">
          <input
            ref={register}
            defaultValue={company?.companyId}
            type="text"
            name="companyId"
            id="companyId"
            hidden
            readOnly
          />
          <label className="form-label">Desktop</label>
          <div className="input-group mb-2">
            <input
              type="number"
              min="0"
              ref={register}
              defaultValue={company?.licenses}
              id="licenseCount"
              name="licenseCount"
              className="form-control"
            />
          </div>
          <label className="form-label">Mobile</label>
          <div className="input-group mb-2">
            <input
              ref={register}
              defaultValue={company?.licensesMobileCount}
              type="number"
              min="0"
              id="mobileLicenseCount"
              name="mobileLicenseCount"
              className="form-control"
            />
          </div>
          <label className="form-label" htmlFor="trialLicenseCount">
            Trial
          </label>
          <div className="form-group mb-2">
            <FieldInput
              ref={register}
              defaultValue={company?.trialLicenses}
              type="number"
              min="0"
              id="trialLicenseCount"
              name="trialLicenseCount"
            />
          </div>
          <button className="btn btn-primary" type="submit" id="btn-submit">
            Submit
          </button>
        </form>
        <LicenseChangeTable licenseChanges={licenseChanges} />
      </div>
    </div>
  );
};

export default Dealer;
