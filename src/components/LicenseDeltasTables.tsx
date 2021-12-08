import { FC } from "react";
import { Counts } from "../data/companies";

interface Props {
  counts: Counts | undefined;
}

const LicenseDeltasTables: FC<Props> = ({ counts }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th colSpan={4}>Changes</th>
        </tr>
        <tr>
          <th className="text-center">Increased Desktop</th>
          <th className="text-center">Increased Mobile</th>
          <th className="text-center">Decreased Desktop</th>
          <th className="text-center">Decreased Mobile</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">{counts?.desktopIncreases}</td>
          <td className="text-center">{counts?.mobileIncreases}</td>
          <td className="text-center">{counts?.desktopDecreases}</td>
          <td className="text-center">{counts?.mobileDecreases}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default LicenseDeltasTables;
