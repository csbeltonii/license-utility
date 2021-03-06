import { FC } from "react";
import { LicenseChange } from "../data/companies";

type Props = {
  licenseChanges: LicenseChange[];
};

const LicenseChangeTable: FC<Props> = ({ licenseChanges }) => {
  let rowNumber: number = 1;

  const renderBody = () => {
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
        <tr key={rowNumber++}>
          <td className="">
            {new Date(change.changeDate).toLocaleDateString()}
          </td>
          <td>{change.licenseBefore}</td>
          <td>{change.licenseAfter}</td>
          <td className="text-right">
            {change.changeType === "D"
              ? "Desktop"
              : change.changeType === "M"
              ? "Mobile"
              : " Mobile Trial"}
          </td>
          <td>{change.changedBy}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="">
        <h5>History</h5>
        <table className="table table-responsive table-hover table-striped">
          <thead>
            <tr>
              <th>Change Date</th>
              <th>Previous</th>
              <th>After</th>
              <th>Change Type</th>
              <th>Changed By</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </>
  );
};

export default LicenseChangeTable;
