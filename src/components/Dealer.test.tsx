import { render, cleanup } from "@testing-library/react";
import Dealer from "./Dealer";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

test("When component is rendered with no license changes, it should show the correct message.", async () => {
  jest.mock("../data/companies", () => ({
    getCompanyAsync: jest.fn(() => {
      return Promise.resolve({
        CompanyId: 1,
        CompanyName: "Craig Test",
        AccountNumber: 1,
        Licenses: 1,
        LicensesMobileCount: 1,
        TrialLicenses: 0,
      });
    }),
    getLicenseChanges: jest.fn(() => {
      return Promise.resolve([]);
    }),
  }));

  const { findByText } = render(
    <BrowserRouter>
      <Dealer />
    </BrowserRouter>
  );

  expect(
    await findByText("There are no recorded license changes.")
  ).toBeInTheDocument();
});

test("When the component is rendered with license changes, it should show the correct information", async () => {
  jest.mock("../data/companies", () => ({
    getCompanyAsync: jest.fn(() => {
      return Promise.resolve({
        CompanyId: 1,
        CompanyName: "Craig Test",
        AccountNumber: 1,
        Licenses: 1,
        LicensesMobileCount: 1,
        TrialLicenses: 0,
      });
    }),
    getLicenseChanges: jest.fn(() => {
      return Promise.resolve([
        {
          companyId: 1,
          licenseBefore: 3,
          licenseAfter: 5,
          changeDate: new Date(1, 1, 2021),
          changeType: "Desktop",
        },
        {
          companyId: 1,
          licenseBefore: 4,
          licenseAfter: 5,
          changeDate: new Date(1, 1, 2021),
          changeType: "Mobile",
        },
      ]);
    }),
  }));

  const { findByText } = render(
    <BrowserRouter>
      <Dealer />
    </BrowserRouter>
  );

  expect(await findByText("Desktop")).toBeInTheDocument();
  expect(await findByText("Mobile")).toBeInTheDocument();
});
