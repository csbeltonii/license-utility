/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Company, getCompanyAsync, updateCompany } from "../data/companies";
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

type FormData = {
  companyId: number;
  licenseCount: number;
  mobileLicenseCount: number;
  trialLicenseCount: number;
};

const Dealer = () => {
  const { accountNumber } = useParams();

  const [company, setCompany] = React.useState<Company | undefined>(undefined);

  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onBlur",
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const doGetCompany = async (accountNumber: number) => {
      console.log(accountNumber);
      let company = await getCompanyAsync(accountNumber);

      setCompany(company);
    };

    doGetCompany(Number(accountNumber));
  }, [accountNumber]);

  const submitForm = async (data: FormData) => {
    await updateCompany({
      CompanyId: data.companyId,
      CompanyName: "",
      AccountNumber: 0,
      Licenses: data.licenseCount,
      LicensesMobileCount: data.mobileLicenseCount,
      TrialLicenses: data.trialLicenseCount,
    });

    navigate("/");
  };

  return (
    <Page title={`Update ${company?.CompanyName}`}>
      <Form
        onSubmit={handleSubmit(submitForm)}
        disabled={formState.isSubmitting}
      >
        <input
          ref={register}
          defaultValue={company?.CompanyId}
          type="text"
          name="companyId"
          id="companyId"
          hidden
          readOnly
        />
        <Fieldset>
          <FieldContainer>
            <FieldLabel htmlFor="licenseCount">Desktop Licenses</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              ref={register}
              defaultValue={company?.Licenses}
              id="licenseCount"
              name="licenseCount"
            />
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="mobileCount">Mobile Licenses</FieldLabel>
            <FieldInput
              ref={register}
              defaultValue={company?.LicensesMobileCount}
              type="number"
              min="0"
              id="mobileLicenseCount"
              name="mobileLicenseCount"
            />
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="trialCount">Trial Licenses</FieldLabel>
            <FieldInput
              ref={register}
              defaultValue={company?.TrialLicenses}
              type="number"
              min="0"
              id="trialLicenseCount"
              name="trialLicenseCount"
            />
          </FieldContainer>
          <button className="btn btn-primary" type="submit" id="btn-submit">
            Submit
          </button>
        </Fieldset>
      </Form>
    </Page>
  );
};

export default Dealer;
