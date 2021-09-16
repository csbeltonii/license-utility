import { render, cleanup } from "@testing-library/react";
import Dealer from "./Dealer";
import { BrowserRouter } from "react-router-dom";
import { Company, LicenseChange } from "../data/companies";

afterEach(cleanup);

test("When component is rendered with no license changes, it should show the correct message.", async () => {
  const company: Company = {
    companyId: 1,
    companyName: "Craig Test",
    accountNumber: 1,
    licenses: 1,
    licensesMobileCount: 1,
    trialLicenses: 0,
    licenseChanges: [],
  };

  const changes: LicenseChange[] = [];

  const { findByText } = render(
    <BrowserRouter>
      <Dealer company={company} licenseChanges={changes} />
    </BrowserRouter>
  );

  expect(
    await findByText("There are no recorded license changes.")
  ).toBeInTheDocument();
});

test("When the component is rendered with license changes, it should show the correct information", async () => {
  const company: Company = {
    companyId: 1,
    companyName: "Craig Test",
    accountNumber: 1,
    licenses: 1,
    licensesMobileCount: 1,
    trialLicenses: 0,
    licenseChanges: [],
  };

  const licenseChanges: LicenseChange[] = [
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
  ];

  const { findByText } = render(
    <BrowserRouter>
      <Dealer company={company} licenseChanges={licenseChanges} />
    </BrowserRouter>
  );

  expect(await findByText("Desktop")).toBeInTheDocument();
  expect(await findByText("Mobile")).toBeInTheDocument();
});
