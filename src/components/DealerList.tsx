import { Company } from "../data/companies";
import { useNavigate } from "react-router-dom";

interface Props {
  companies: Company[];
}
const DealerList = ({ companies }: Props) => {
  const navigate = useNavigate();

  const handleRowClick = (accountNumber: number) => {
    navigate(`/dealer/${accountNumber}`);
  };

  const renderBody = () => {
    return companies?.map((company: Company) => {
      return (
        <tr
          key={company.companyId}
          onClick={() => handleRowClick(company.accountNumber)}
        >
          <td>{company.accountNumber}</td>
          <td>{company.companyName}</td>
          <td className="text-end">{company.licenses}</td>
          <td className="text-end">{company.licensesMobileCount}</td>
          <td className="text-end">{company.trialLicenses}</td>
        </tr>
      );
    });
  };

  return (
    <div className="m-1 p-2">
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th>Account #</th>
            <th>Company</th>
            <th className="text-end">Desktop</th>
            <th className="text-end">Mobile</th>
            <th className="text-end">Trial</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

export default DealerList;
