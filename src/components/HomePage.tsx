import React from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./Styles/Styles";

type FormData = {
  search: string;
};

const HomePage = () => {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const doGetCompanies = async () => {
      const companies: Company[] = await getCompaniesAsync();

      setCompanies(companies);
    };

    doGetCompanies();
  }, []);

  const handleSearchChange = async (data: FormData) => {
    navigate(`/search?search=${data.search}`);
  };

  return (
    <Page title="Dealers">
      <div className="container">
        <div className="col-5 m-1 p-2">
          <form
            className="d-flex"
            method="get"
            id="search-form"
            onSubmit={handleSubmit(handleSearchChange)}
          >
            <input
              type="text"
              id="search-bar"
              className="form-control mt-2 mb-2"
              ref={register}
              name="search"
              placeholder="Search by Account Number or Dealership"
            />
            <PrimaryButton
              type="submit"
              className="btn btn-success m-2"
              id="btn-submit"
            >
              Search
            </PrimaryButton>
          </form>
        </div>
        <DealerList companies={companies} />
      </div>
    </Page>
  );
};

export default HomePage;
