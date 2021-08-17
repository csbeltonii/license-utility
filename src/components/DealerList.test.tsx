import { render, cleanup } from "@testing-library/react";
import DealerList from "./DealerList";
import { Company } from "../data/companies";
import { BrowserRouter } from "react-router-dom";
import { getSampleCompanyList } from "../utility/companyFactory";

afterEach(cleanup);

test("When the component is rendered, the correct information should be displayed.", async () => {
  const companies: Company[] = getSampleCompanyList();

  const { findByText } = render(
    <BrowserRouter>
      <DealerList companies={companies} />
    </BrowserRouter>
  );

  expect(await findByText("Craig Test")).toBeInTheDocument();
  expect(await findByText("Craig Test 2")).toBeInTheDocument();
});
