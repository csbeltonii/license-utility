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
          <td>{company.licenses}</td>
          <td>{company.licensesMobileCount}</td>
          <td>{company.trialLicenses}</td>
        </tr>
      );
    });
  };

  return (
    <div className="m-1">
      <table className="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th>Account #</th>
            <th>Company</th>
            <th>Desktop</th>
            <th>Mobile Licenses</th>
            <th>Trial Licenses</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

export default DealerList;
