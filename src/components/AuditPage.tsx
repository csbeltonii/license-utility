import { useMsal } from "@azure/msal-react";
import { useCallback, useState, FC, useEffect } from "react";
import {
  AuditRequest,
  getAudit,
  MonthlyLicenseAudit,
  LicenseChangeAudit,
} from "../data/companies";
import { SilentRequest } from "@azure/msal-browser";
import Page from "./Page";

const AuditPage: FC = () => {
  const [audit, setAudit] = useState<MonthlyLicenseAudit | null>();
  const { instance } = useMsal();

  const populate = useCallback(async () => {
    const account = instance.getAllAccounts()[0];

    const silentRequest: SilentRequest = {
      scopes: ["api://a22e7296-106f-4a00-af8d-f86edb386a1b/api_access"],
      account: account,
    };

    const token = await instance.acquireTokenSilent(silentRequest);

    const request: AuditRequest = {
      startDate: new Date("11/01/2021 00:00:00.000"),
      endDate: new Date("11/30/2021 23:59:59.999"),
    };

    const audit = await getAudit(request, token.accessToken);

    setAudit(audit);
  }, [instance]);

  useEffect(() => {
    populate();
  }, [populate]);

  return (
    <Page title={"Audit"}>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Total </th>
            <th className="text-center">Desktop</th>
            <th className="text-center">Mobile </th>
            <th className="text-center">New</th>
            <th className="text-center">Lost</th>
            <th className="text-center">Increased Desktop</th>
            <th className="text-center">Increased Mobile</th>
            <th className="text-center">Decreased Desktop</th>
            <th className="text-center">Decreased Mobile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{audit?.totals.totalDealerships}</td>
            <td className="text-center">
              {audit?.totals.totalDesktopLicenses}
            </td>
            <td className="text-center">{audit?.totals.totalMobileLicenses}</td>
            <td className="text-end">{audit?.customerChanges.newCustomers}</td>
            <td className="text-end">{audit?.customerChanges.lostCustomers}</td>
            <td className="text-end">{audit?.counts.desktopIncreases}</td>
            <td className="text-end">{audit?.counts.mobileIncreases}</td>
            <td className="text-end">{audit?.counts.desktopDecreases}</td>
            <td className="text-end">{audit?.counts.mobileDecreases}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-hover">
        <thead>
          <th className="text-center">Company</th>
          <th className="text-center">Licenses Before</th>
          <th className="text-center">Licenses After</th>
          <th className="text-center">Difference</th>
          <th className="text-center">Change Date</th>
          <th className="text-center">Change Type</th>
        </thead>
        <tbody>
          {audit?.licenseChanges.map((changeAudit: LicenseChangeAudit) => {
            return (
              <tr key={changeAudit.changeId}>
                <td className="text-start">{changeAudit.companyName}</td>
                <td className="text-end">{changeAudit.licenseBefore}</td>
                <td className="text-end">{changeAudit.licenseAfter}</td>
                <td className="text-end">{changeAudit.difference}</td>
                <td className="text-end">
                  {new Date(changeAudit.changeDate).toLocaleDateString()}
                </td>
                <td className="text-end">{changeAudit.changeType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Page>
  );
};

export default AuditPage;
