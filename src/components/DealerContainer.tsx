import { FC, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Page from "./Page";
import {
  Company,
  getCompanyAsync,
  getLicenseChanges,
  LicenseChange,
} from "../data/companies";
import { useState } from "react";
import Dealer from "./Dealer";
import { useMsal } from "@azure/msal-react";
import { SilentRequest } from "@azure/msal-browser";

const DealerContainer: FC = () => {
  const [company, setCompany] = useState<Company>();

  const [companyLicenseChanges, setCompanyLicenseChanges] = useState<
    LicenseChange[]
  >([]);

  const { accountNumber } = useParams();
  const { instance } = useMsal();

  const populate = useCallback(async () => {
    const account = instance.getAllAccounts()[0];

    const silentRequest: SilentRequest = {
      scopes: ["api://7596909a-6bed-4d94-8467-4b2ac34a578f/access_user_data"],
      account: account,
    };

    const token = await instance.acquireTokenSilent(silentRequest);

    console.log(token.accessToken);

    const company = await getCompanyAsync(
      Number(accountNumber),
      token.accessToken
    );

    const changes = await getLicenseChanges(
      company.companyId,
      token.accessToken
    );

    setCompany(company);
    setCompanyLicenseChanges(changes);
  }, [accountNumber, instance]);

  useEffect(() => {
    populate();
  }, [populate]);

  return (
    <Page title={String(company?.companyName)}>
      <Dealer company={company} licenseChanges={companyLicenseChanges} />
    </Page>
  );
};

export default DealerContainer;
