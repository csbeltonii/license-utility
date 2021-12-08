import { FC } from "react";
import { LicenseChangeAudit } from "../data/companies";

interface Props {
  changeAudits: LicenseChangeAudit[] | undefined;
}

const ItemizedAuditsTable: FC<Props> = ({ changeAudits }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th colSpan={6}>Itemized Changes</th>
        </tr>
        <tr>
          <th className="text-center">Company</th>
          <th className="text-center">Licenses Before</th>
          <th className="text-center">Licenses After</th>
          <th className="text-center">Difference</th>
          <th className="text-center">Change Date</th>
          <th className="text-center">Change Type</th>
        </tr>
      </thead>
      <tbody>
        {changeAudits?.map((changeAudit: LicenseChangeAudit) => {
          return (
            <tr key={changeAudit.changeId}>
              <td className="text-start">{changeAudit.companyName}</td>
              <td className="text-center">{changeAudit.licenseBefore}</td>
              <td className="text-center">{changeAudit.licenseAfter}</td>
              <td className="text-center">{changeAudit.difference}</td>
              <td className="text-center">
                {new Date(changeAudit.changeDate).toLocaleDateString()}
              </td>
              <td className="text-center">{changeAudit.changeType}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ItemizedAuditsTable;
