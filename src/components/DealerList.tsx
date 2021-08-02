import React from "react";
import { Company, getCompaniesAsync } from "../data/companies";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import { FieldInput } from "./Styles/Styles";
import { string } from "yargs";

const DealerList = () => {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const doGetCompanies = async () => {
      const companies: Company[] = await getCompaniesAsync();

      setCompanies(companies);
    };

    doGetCompanies();
  }, []);

  const handleRowClick = (accountNumber: number) => {
    navigate(`/dealer/${accountNumber}`);
  };

  const handleSearchChange = async () => {
    setSearch()

    if (search.length === 0) {
      const companies: Company[] = await getCompaniesAsync();

      setCompanies(companies);
    } else {
      const companies = await getCompaniesAsync();

      const results: Company[] = companies.filter((company) =>
        company.CompanyName.includes(search)
      );

      setCompanies(results);
    }
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
    <div>
      Search: <input type="text" onChange={() => handleSearchChange} />
      <Table striped hover>
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
      </Table>
    </div>
  );
};

export default DealerList;
