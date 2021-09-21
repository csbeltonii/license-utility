import { FC, useEffect, useState } from "react";
import { Company } from "../data/companies";
import LicenseChangeTable from "./LicenseChangeTable";
import { LicenseChange } from "../data/companies";
import CustomPagination from "./CustomPagination";
import LicenseForm from "./LicenseForm";
import PageTitle from "./PageTitle";

type Props = {
  company: Company | undefined;
  licenseChanges: LicenseChange[];
};

const Dealer: FC<Props> = ({ company, licenseChanges }) => {
  const [list, setList] = useState<LicenseChange[]>([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);

  const endIndex: number = pageNumber * pageSize;
  const startIndex: number = endIndex - pageSize;
  const currentPage: LicenseChange[] = list.slice(startIndex, endIndex);
  const lastPage: number = Math.ceil(licenseChanges.length / pageSize);
  const disablePrevious: boolean = pageNumber === 1 ? true : false;
  const disableNext: boolean = currentPage.length < pageSize ? true : false;

  useEffect(() => {
    setList(licenseChanges);
  }, [licenseChanges]);

  const next = () => {
    let nextPageNumber = pageNumber + 1;

    setPageNumber(nextPageNumber);
  };

  const previous = () => {
    let previousPageNumber = pageNumber - 1;
    setPageNumber(previousPageNumber);
  };

  return (
    <div className="d-flex flex-column justify-content-around">
      <div className="m-1 p-1">
        <PageTitle title={company?.companyName} />
        <LicenseForm company={company} />
        <LicenseChangeTable licenseChanges={currentPage} />
        <CustomPagination
          nextPage={next}
          previousPage={previous}
          currentPage={pageNumber}
          lastPage={lastPage}
          disableNextButton={disableNext}
          disablePreviousButton={disablePrevious}
        />
      </div>
    </div>
  );
};

export default Dealer;
