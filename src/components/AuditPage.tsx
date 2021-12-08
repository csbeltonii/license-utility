import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useState, FC } from "react";
import { AuditRequest, getAudit, MonthlyLicenseAudit } from "../data/companies";
import { SilentRequest } from "@azure/msal-browser";
import Page from "./Page";
import TotalsTable from "./TotalsTable";
import NewLostCustomersTable from "./NewLostCustomersTable";
import LicenseDeltasTables from "./LicenseDeltasTables";
import ItemizedAuditsTable from "./ItemizedAuditsTable";
import AuditForm from "./AuditForm";

type FormData = {
  startDate: Date;
  endDate: Date;
};

const AuditPage: FC = () => {
  const [audit, setAudit] = useState<MonthlyLicenseAudit | null>(null);
  const { instance } = useMsal();

  const isAuthenticated = useIsAuthenticated();

  const submit = async (data: FormData) => {
    const account = instance.getAllAccounts()[0];

    const silentRequest: SilentRequest = {
      scopes: ["api://a22e7296-106f-4a00-af8d-f86edb386a1b/api_access"],
      account: account,
    };

    const token = await instance.acquireTokenSilent(silentRequest);

    const request: AuditRequest = {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };

    const audit = await getAudit(request, token.accessToken);

    setAudit(audit);
  };

  return (
    <Page title={"Audit"}>
      {isAuthenticated === false ? (
        <div className="p-3 m-2">
          <h2>You must login to use this application.</h2>
        </div>
      ) : (
        <>
          <AuditForm submitForm={submit} />
          {audit !== null ? (
            <>
              <TotalsTable licenseTotals={audit?.totals} />
              <NewLostCustomersTable customerChanges={audit?.customerChanges} />
              <LicenseDeltasTables counts={audit?.counts} />
              <ItemizedAuditsTable changeAudits={audit?.licenseChanges} />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Page>
  );
};

export default AuditPage;
