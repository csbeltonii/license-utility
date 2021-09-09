import { useState, useEffect, ChangeEvent, useCallback } from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import DealerListSearch from "./DealerListSearch";
import CustomPagination from "./CustomPagination";
import { Modal } from "reactstrap";

const HomePage = () => {
  const [fullCompaniesList, setFullCompaniesList] = useState<Company[]>([]);
  const [companiesList, setCompaniesList] = useState<Company[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modal, setModal] = useState<boolean>(false);
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

  const toggleModal = () => setModal(!modal);

  return (
    <Page title="Dealers">
      <DealerListSearch handleSearchChange={handleSearchChange} />
      <DealerList companies={currentPage} openModal={toggleModal} />
      <CustomPagination
        nextPage={next}
        previousPage={previous}
        currentPage={pageNumber}
        lastPage={lastPage}
        disableNextButton={disableNext}
        disablePreviousButton={disablePrevious}
      />
      <Modal isOpen={modal} toggle={toggleModal}></Modal>
    </Page>
  );
};

export default HomePage;
