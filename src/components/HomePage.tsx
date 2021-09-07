import { useState, useEffect } from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import { useNavigate } from "react-router-dom";
import DealerListSearch from "./DealerListSearch";
import CustomPagination from "./CustomPagination";

type FormData = {
  search: string;
};

const HomePage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const endIndex: number = pageNumber * pageSize;
  const startIndex: number = endIndex - pageSize;
  const current: Company[] = companies.slice(startIndex, endIndex);
  const lastPage: number = Math.round(companies.length / pageSize) + 1;
  const disablePrevious: boolean = pageNumber === 1 ? true : false;
  const disableNext: boolean = current.length < pageSize ? true : false;

  useEffect(() => {
    const doGetCompanies = async () => {
      const companies: Company[] = await getCompaniesAsync();

      setCompanies(companies);
    };

    doGetCompanies();
  }, []);

  const handleSearchChange = async (data: FormData) => {
    navigate(`/search?search=${data.search}`);
  };

  const next = () => {
    let nextPageNumber = pageNumber + 1;

    setPageNumber(nextPageNumber);
  };

  const previous = () => {
    let previousPageNumber = pageNumber - 1;
    setPageNumber(previousPageNumber);
  };

  return (
    <Page title="Dealers">
      <DealerListSearch handleSearchChange={handleSearchChange} />
      <DealerList companies={current} />
      <CustomPagination
        nextPage={next}
        previousPage={previous}
        currentPage={pageNumber}
        lastPage={lastPage}
        disableNextButton={disableNext}
        disablePreviousButton={disablePrevious}
      />
    </Page>
  );
};

export default HomePage;
