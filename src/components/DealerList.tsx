import { FC } from "react";
import { Company } from "../data/companies";
import { useNavigate } from "react-router-dom";
import DealerTableHeader from "./DealerTableHeader";
import DealerTableBody from "./DealerTableBody";

interface Props {
  companies: Company[];
  openModal: () => void;
}

const DealerList: FC<Props> = ({ companies, openModal }) => {
  return (
    <div className="m-1 p-2">
      <table className="table table-hover table-sm">
        <DealerTableHeader />
        <DealerTableBody companies={companies} handleRowClick={openModal} />
      </table>
    </div>
  );
};

export default DealerList;
