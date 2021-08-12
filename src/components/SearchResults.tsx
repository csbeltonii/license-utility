import React from "react";
import Page from "./Page";
import { Company, getCompaniesAsync } from "../data/companies";
import DealerList from "./DealerList";
import { Link, useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = React.useState<Company[]>([]);

  const search: string | null = searchParams.get("search" || "");

  React.useEffect(() => {
    const doGetCompanies = async (search: string) => {
      const companies: Company[] = await getCompaniesAsync();

      const results: Company[] = companies.filter(
        (company) =>
          company.companyName
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase().toString()) ||
          company.accountNumber === Number(search)
      );

      setSearchResults(results);
    };

    doGetCompanies(search ?? "");
  });

  return (
    <Page title="Search Results">
      <div className="container">
        <DealerList companies={searchResults} />
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </Page>
  );
};

export default SearchResults;
