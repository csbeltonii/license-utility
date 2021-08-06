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
          key={company.CompanyId}
          onClick={() => handleRowClick(company.AccountNumber)}
        >
          <td>{company.AccountNumber}</td>
          <td>{company.CompanyName}</td>
          <td>{company.Licenses}</td>
          <td>{company.LicensesMobileCount}</td>
          <td>{company.TrialLicenses}</td>
        </tr>
      );
    });
  };

  return (
    <div className="m-1">
      <table className="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Company Name</th>
            <th>Desktop Licenses</th>
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
