import { useState, useEffect, ChangeEvent } from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import DealerListSearch from "./DealerListSearch";
import CustomPagination from "./CustomPagination";
import DealerTableHeader from "./DealerTableHeader";
import DealerTableBody from "./DealerTableBody";

const HomePage = () => {
  const [fullCompaniesList, setFullCompaniesList] = useState<Company[]>([]);
  const [companiesList, setCompaniesList] = useState<Company[]>([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const endIndex: number = pageNumber * pageSize;
  const startIndex: number = endIndex - pageSize;
  const currentPage: Company[] = companiesList.slice(startIndex, endIndex);
  const lastPage: number = Math.round(companiesList.length / pageSize) + 1;
  const disablePrevious: boolean = pageNumber === 1 ? true : false;
  const disableNext: boolean = currentPage.length < pageSize ? true : false;

  useEffect(() => {
    const doGetCompanies = async () => {
      const companies: Company[] = await getCompaniesAsync();

      setCompaniesList(companies);
      setFullCompaniesList(companies);
    };

    doGetCompanies();
  }, []);

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchCriteria = event.target.value.trim();
    const companies = fullCompaniesList;

    const results = companies.filter(
      (company) =>
        company.accountNumber === Number(searchCriteria) ||
        company.companyName
          .toLocaleLowerCase()
          .includes(searchCriteria.toLocaleLowerCase())
    );

    setCompaniesList(results);
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
      <DealerList>
        <DealerTableHeader />
        <DealerTableBody companies={currentPage} />
      </DealerList>
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
