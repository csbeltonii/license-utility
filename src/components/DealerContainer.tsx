import { FC, useEffect } from "react";
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

const DealerContainer: FC = () => {
  const [company, setCompany] = useState<Company>();

  const [companyLicenseChanges, setCompanyLicenseChanges] = useState<
    LicenseChange[]
  >([]);

  const { accountNumber } = useParams();

  useEffect(() => {
    const doGetCompany = async (accountNumber: number) => {
      const result = await getCompanyAsync(accountNumber);
      const changes = await getLicenseChanges(result.companyId);

      console.log(accountNumber);

      console.log(result);
      console.log(changes);

      setCompany(result);
      setCompanyLicenseChanges(changes);
    };

    doGetCompany(Number(accountNumber));
  }, [accountNumber]);

  return (
    <Page title={String(company?.companyName)}>
      <Dealer company={company} licenseChanges={companyLicenseChanges} />
    </Page>
  );
};

export default DealerContainer;
