import { useState, useEffect, ChangeEvent, useCallback } from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import DealerListSearch from "./DealerListSearch";
import CustomPagination from "./CustomPagination";
import DealerTableHeader from "./DealerTableHeader";
import DealerTableBody from "./DealerTableBody";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { SilentRequest } from "@azure/msal-browser";

const HomePage = () => {
  const [fullCompaniesList, setFullCompaniesList] = useState<Company[]>([]);
  const [companiesList, setCompaniesList] = useState<Company[]>([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const endIndex: number = pageNumber * pageSize;
  const startIndex: number = endIndex - pageSize;
  const currentPage: Company[] = companiesList.slice(startIndex, endIndex);
  const lastPage: number = Math.ceil(companiesList.length / pageSize);
  const disablePrevious: boolean = pageNumber === 1 ? true : false;
  const disableNext: boolean = currentPage.length < pageSize ? true : false;

  const getCompanies = useCallback(async () => {
    if (isAuthenticated) {
      const account = instance.getAllAccounts()[0];

      const silentRequest: SilentRequest = {
        scopes: ["api://7596909a-6bed-4d94-8467-4b2ac34a578f/access_user_data"],
        account: account,
      };

      const token = await instance.acquireTokenSilent(silentRequest);

      const companies = await getCompaniesAsync(token.accessToken);

      setCompaniesList(companies);
      setFullCompaniesList(companies);
    }
  }, [instance, isAuthenticated]);

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
      {isAuthenticated === false ? (
        <div className="p-3 m-2">
          <h2>You must login to use this application.</h2>
          <SignInButton />
        </div>
      ) : (
        <>
          <SignOutButton />
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
        </>
      )}
    </Page>
  );
};

export default HomePage;
