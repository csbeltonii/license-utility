import { useState, useEffect } from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./Styles/Styles";
import DealerListSearch from "./DealerListSearch";
import { networkInterfaces } from "os";

type FormData = {
  search: string;
};

const HomePage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const doGetCompanies = async (
      currentPage: number,
      currentPageSize: number
    ) => {
      const companies: Company[] = await getCompaniesAsync(
        currentPage,
        currentPageSize
      );

      setCompanies(companies);
    };

    doGetCompanies(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  const handleSearchChange = async (data: FormData) => {
    navigate(`/search?search=${data.search}`);
  };

  const advancePage = () => {
    let nextPageNumber = pageNumber + 1;

    setPageNumber(nextPageNumber);
  };

  const previousPage = () => {
    let previousPageNumber = pageNumber - 1;

    setPageNumber(previousPageNumber);
  };

  return (
    <Page title="Dealers">
      <DealerListSearch handleSearchChange={handleSearchChange} />
      <DealerList companies={companies} />
      <div className="btn btn-group d-flex">
        <button
          className="btn btn-primary"
          onClick={previousPage}
          disabled={pageNumber === 0 ? true : false}
        >
          Previous
        </button>
        <button
          id="btn-next"
          className="btn btn-primary"
          onClick={advancePage}
          disabled={companies.length < pageSize ? true : false}
        >
          Next
        </button>
      </div>
    </Page>
  );
};

export default HomePage;
