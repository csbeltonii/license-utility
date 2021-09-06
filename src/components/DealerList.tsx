import { FC } from "react";
import { Company } from "../data/companies";
import { useNavigate } from "react-router-dom";
import DealerTableHeader from "./DealerTableHeader";
import DealerTableBody from "./DealerTableBody";

interface Props {
  companies: Company[];
}

const DealerList: FC<Props> = ({ companies }) => {
  const navigate = useNavigate();

  const handleRowClick = (accountNumber: number) => {
    navigate(`/dealer/${accountNumber}`);
  };

  return (
    <div className="m-1 p-2">
      <table className="table table-hover table-sm">
        <DealerTableHeader />
        <DealerTableBody
          companies={companies}
          handleRowClick={handleRowClick}
        />
      </table>
    </div>
  );
};

export default DealerList;
