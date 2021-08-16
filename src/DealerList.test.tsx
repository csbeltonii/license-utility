import { render, cleanup } from "@testing-library/react";
import DealerList from "./components/DealerList";
import { Company } from "./data/companies";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

test("When the component is rendered, the correct information should be displayed.", async () => {
  const companies: Company[] = [
    {
      companyId: 1,
      companyName: "Craig Test",
      accountNumber: 1,
      licenses: 1,
      licensesMobileCount: 1,
      trialLicenses: 1,
    },
    {
      companyId: 2,
      companyName: "Craig Test 2",
      accountNumber: 1,
      licenses: 1,
      licensesMobileCount: 1,
      trialLicenses: 1,
    },
  ];

  const { findByText } = render(
    <BrowserRouter>
      <DealerList companies={companies} />
    </BrowserRouter>
  );

  expect(await findByText("Craig Test")).toBeInTheDocument();
  expect(await findByText("Craig Test 2")).toBeInTheDocument();
});
