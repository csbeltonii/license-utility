import { FC } from "react";
import { Company } from "../data/companies";
import { useNavigate } from "react-router-dom";

type Props = {
  companies: Company[];
};

const DealerTableBody: FC<Props> = ({ companies }) => {
  const navigate = useNavigate();

  const handleRowClick = (accountNumber: number) => {
    navigate(`/dealer/${accountNumber}`);
  };

  return (
    <tbody>
      {companies?.map((company: Company) => {
        return (
          <tr
            key={company.companyId}
            data-bs-id={company.accountNumber}
            onClick={() => handleRowClick(company.accountNumber)}
          >
            <td>{company.accountNumber}</td>
            <td>{company.companyName}</td>
            <td className="text-end">{company.licenses}</td>
            <td className="text-end">{company.licensesMobileCount}</td>
            <td className="text-end">{company.trialLicenses}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default DealerTableBody;
