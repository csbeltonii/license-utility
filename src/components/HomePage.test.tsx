import { render, cleanup } from "@testing-library/react";
import HomePage from "./HomePage";
import { Company } from "../data/companies";
import { BrowserRouter } from "react-router-dom";
import { getSampleCompanyList } from "../utility/companyFactory";

afterEach(cleanup);

test("When component renders,the proper information should be display.", () => {
  const sampleCompanies = getSampleCompanyList();

  jest.mock("../data/companies", () => ({
    getCompaniesAsync: jest.fn(() => {
      return Promise.resolve(sampleCompanies);
    }),
  }));
});
