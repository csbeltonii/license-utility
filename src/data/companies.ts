import { NumericLiteral } from "typescript";

const webApiUrl = "https://localhost:44375/api";

export interface Company {
  CompanyId: number;
  CompanyName: string;
  AccountNumber: number;
  Licenses: number;
  LicensesMobileCount: number;
  TrialLicenses: number;
}

interface CompanyFromServer {
  accountNumber: number;
  accountSid: string;
  agentYear: string;
  altContact: string;
  billAddress1: string;
  billAddress2: string;
  billCity: string;
  billState: string;
  billZip: string;
  companyId: number;
  companyName: string;
  companyType: string;
  contact: string;
  databaseVersion: string;
  dealer: string;
  dealerId: string;
  dealerPass: string;
  ein: string;
  emailPort: number;
  emailServer: string;
  emailSsl: boolean;
  endDate: Date;
  fmfy: number;
  fmity: number;
  folderName: string;
  invoiceUnit: boolean;
  isActive: boolean;
  legalName: string;
  licenseKey: string;
  licenseType: string;
  licenses: number;
  licensesMobileCount: number;
  licensesUsed: number;
  logoName: string;
  parentId: number;
  phone1: string;
  phone2: string;
  phone3: string;
  phone4: string;
  productVersion: string;
  qbName: string;
  qbOnline: boolean;
  salesRep: string;
  serverId: number;
  shipAddress1: string;
  shipAddress2: string;
  shipCity: string;
  shipState: string;
  shipZip: string;
  startDate: Date;
  supportType: string;
  terminalYN: boolean;
  trialLicenses: number;
  updateServerId: number;
  versionSpec: string;
  webServerId: number;
  webServerIdNew: number;
}

const mapCompanyFromServer = (data: CompanyFromServer): Company => ({
  CompanyId: data.companyId,
  CompanyName: data.companyName,
  AccountNumber: data.accountNumber,
  Licenses: data.licenses,
  LicensesMobileCount: data.licensesMobileCount,
  TrialLicenses: data.trialLicenses === null ? 0 : data.trialLicenses,
});

export const getCompanies = (): Company[] => {
  let companyList: Company[] = [];
  let companyId: number = 1;
  let accountNumber: number = 30000;

  for (let i = 0; i < 20; i++) {
    let licenseNum = Math.random() * 10;
    let mobileNum = Math.random() * 10;
    let trialNum = Math.random() * 5;
    let num = Math.round(Math.random() * 100);

    companyList.push({
      CompanyId: companyId,
      CompanyName: `Test Company ${num}`,
      AccountNumber: accountNumber,
      Licenses: Math.round(licenseNum),
      LicensesMobileCount: Math.round(mobileNum),
      TrialLicenses: Math.round(trialNum),
    });

    companyId++;
    accountNumber++;
  }

  return companyList;
};

export const getCompaniesAsync = async (): Promise<Company[]> => {
  let request = new Request(`${webApiUrl}/Company/companies`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);

  if (response.ok) {
    const body = await response.json();

    return body.map(mapCompanyFromServer);
  } else {
    return [];
  }
};

export const getCompany = (companyId: number): Company | undefined => {
  const companyList = getCompanies();

  let company = companyList.find((company) => company.CompanyId === companyId);

  return company;
};

export const getCompanyAsync = async (
  accountNumber: number
): Promise<Company | undefined> => {
  const request = new Request(`${webApiUrl}/Company/${accountNumber}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);

  if (response.ok) {
    const body = await response.json();

    return mapCompanyFromServer(body);
  } else {
    return undefined;
  }
};

export const updateCompany = async (
  updatedCompany: Company
): Promise<boolean> => {
  const request = new Request(
    `${webApiUrl}/Company/${updatedCompany.CompanyId}`,
    {
      method: "post",
      body: JSON.stringify(updatedCompany),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const response = await fetch(request);

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
