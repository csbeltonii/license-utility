import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "./Page";
import {
  Company,
  getCompanyAsync,
  getLicenseChanges,
  LicenseChange,
} from "../data/companies";
import { useState } from "react";
import Dealer from "./Dealer";

const DealerContainer: FC = () => {
  const [company, setCompany] = useState<Company>();
  const [companyLicenseChanges, setCompanyLicenseChanges] = useState<
    LicenseChange[]
  >([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const doGetCompany = async (accountNumber: number) => {
      const result = await getCompanyAsync(accountNumber);
      setCompany(result);
    };

    doGetCompany(Number(searchParams));
  });

  useEffect(() => {
    const doGetLicenseChanges = async (companyId: number) => {
      const result = await getLicenseChanges(companyId);
      setCompanyLicenseChanges(result);
    };

    doGetLicenseChanges(Number(company?.companyId));
  });

  return (
    <Page title={String(company?.companyName)}>
      <Dealer company={company} licenseChanges={companyLicenseChanges} />
    </Page>
  );
};

export default DealerContainer;
