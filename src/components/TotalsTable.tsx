import { FC } from "react";
import { LicenseTotals } from "../data/companies";

interface Props {
  licenseTotals: LicenseTotals | undefined;
}

const Totals: FC<Props> = ({ licenseTotals }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>Licenses</th>
        </tr>
        <tr>
          <th className="text-center">Customers</th>
          <th className="text-center">Desktop</th>
          <th className="text-center">Mobile</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">{licenseTotals?.totalDealerships}</td>
          <td className="text-center">{licenseTotals?.totalDesktopLicenses}</td>
          <td className="text-center">{licenseTotals?.totalMobileLicenses}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Totals;
