import React from "react";
import { render, cleanup, findByTestId } from "@testing-library/react";
import Dealer from "./Dealer";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

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
}));

test("When the Dealer component is rendered, it should contain the proper information", async () => {
  const { findByText } = render(
    <BrowserRouter>
      <Dealer />
    </BrowserRouter>
  );

  expect(await findByText("Trial Licenses")).toBeInTheDocument();
  expect(await findByText("Submit")).toBeInTheDocument();
});
