import { FC } from "react";
import { Company } from "../data/companies";

type Props = {
  companies: Company[];
  handleRowClick: any;
};

const DealerTableBody: FC<Props> = ({ companies, handleRowClick }) => {
  return (
    <tbody>
      {companies?.map((company: Company) => {
        return (
          <tr
            key={company.companyId}
            data-bs-id={company.accountNumber}
            data-bs-toggle="modal"
            data-bs-target="#dealer-modal"
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
