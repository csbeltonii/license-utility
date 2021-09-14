import { useState, useEffect, ChangeEvent, useCallback } from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import DealerListSearch from "./DealerListSearch";
import CustomPagination from "./CustomPagination";
import DealerTableHeader from "./DealerTableHeader";
import DealerTableBody from "./DealerTableBody";
import { useIsAuthenticated, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { request } from "http";

const HomePage = () => {
  const [fullCompaniesList, setFullCompaniesList] = useState<Company[]>([]);
  const [companiesList, setCompaniesList] = useState<Company[]>([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const isAuthenticated = useIsAuthenticated();
  const {} = useMsalAuthentication(InteractionType.Popup);

  const endIndex: number = pageNumber * pageSize;
  const startIndex: number = endIndex - pageSize;
  const currentPage: Company[] = companiesList.slice(startIndex, endIndex);
  const lastPage: number = Math.ceil(companiesList.length / pageSize);
  const disablePrevious: boolean = pageNumber === 1 ? true : false;
  const disableNext: boolean = currentPage.length < pageSize ? true : false;

  const getCompanies = useCallback(async () => {
    const companies = await getCompaniesAsync();

    setCompaniesList(companies);
    setFullCompaniesList(companies);
  }, []);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

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
