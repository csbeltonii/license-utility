/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import {
  Company,
  getCompanyAsync,
  getLicenseChanges,
  LicenseChange,
  updateCompany,
} from "../data/companies";
import { useParams } from "react-router-dom";
import Page from "./Page";
import { Form } from "reactstrap";
import { useForm } from "react-hook-form";
import {
  FieldContainer,
  FieldInput,
  FieldLabel,
  Fieldset,
} from "./Styles/Styles";
import { useNavigate } from "react-router-dom";
import { getuid, mainModule } from "process";

type FormData = {
  companyId: number;
  licenseCount: number;
  mobileLicenseCount: number;
  trialLicenseCount: number;
};

const Dealer = () => {
  const { accountNumber } = useParams();

  const [company, setCompany] = React.useState<Company | undefined>(undefined);
  const [licenseChanges, setLicenseChanges] = React.useState<LicenseChange[]>(
    []
  );

  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onBlur",
  });

  const navigate = useNavigate();

  let rowNumber: number = 1;

  React.useEffect(() => {
    const doGetCompany = async (accountNumber: number) => {
      let company = await getCompanyAsync(accountNumber);
      let changes = await getLicenseChanges(company.companyId);

      setCompany(company);
      setLicenseChanges(changes);
    };

    doGetCompany(Number(accountNumber));
  }, [accountNumber]);

  const submitForm = async (data: FormData) => {
    await updateCompany({
      companyId: data.companyId,
      companyName: "",
      accountNumber: 0,
      licenses: data.licenseCount,
      licensesMobileCount: data.mobileLicenseCount,
      trialLicenses: data.trialLicenseCount,
    });

    navigate("/");
  };

  const renderBody = () => {
    console.log(licenseChanges);

    if (licenseChanges.length === 0)
      return (
        <tr>
          <td className="text-center" colSpan={5}>
            There are no recorded license changes.
          </td>
        </tr>
      );

    return licenseChanges.map((change: LicenseChange) => {
      return (
        <tr key={rowNumber}>
          <td>{new Date(change.changeDate).toLocaleDateString()}</td>
          <td>{change.licenseBefore}</td>
          <td>{change.licenseAfter}</td>
          <td className="text-right">
            {change.changeType === "D"
              ? "Desktop"
              : change.changeType === "M"
              ? "Mobile"
              : " Mobile Trial"}
          </td>
        </tr>
      );
    });
  };

  return (
    <Page title={`${company?.companyName}`}>
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
              {" "}
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
        </div>
        <div className="m-3 p-3">
          <h5>History</h5>
          <table className="table table-response table-hover table-striped">
            <thead>
              <tr>
                <th>Change Date</th>
                <th>Previous</th>
                <th>After</th>
                <th>Change Type</th>
              </tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </table>
        </div>
      </div>
    </Page>
  );
};

export default Dealer;
