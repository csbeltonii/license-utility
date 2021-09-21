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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { accountNumber } = useParams();
  const { instance } = useMsal();

  const populate = useCallback(async () => {
    const account = instance.getAllAccounts()[0];

    const silentRequest: SilentRequest = {
      scopes: ["api://a22e7296-106f-4a00-af8d-f86edb386a1b/api_access"],
      account: account,
    };

    const token = await instance.acquireTokenSilent(silentRequest);
    setIsLoading(true);
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
    setIsLoading(false);
  }, [accountNumber, instance, setIsLoading]);

  useEffect(() => {
    populate();
  }, [populate]);

  return (
    <Page title={String(company?.companyName)}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Dealer company={company} licenseChanges={companyLicenseChanges} />
      )}
    </Page>
  );
};

export default DealerContainer;
