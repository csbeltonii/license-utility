import React from "react";
import Page from "./Page";
import DealerList from "./DealerList";
import { Company, getCompaniesAsync } from "../data/companies";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./Styles/Styles";
import DealerListSearch from "./DealerListSearch";

type FormData = {
  search: string;
};

const HomePage = () => {
  const [companies, setCompanies] = React.useState<Company[]>([]);
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
        <DealerListSearch handleSearchChange={handleSearchChange} />
        <DealerList companies={companies} />
      </div>
    </Page>
  );
};

export default HomePage;
