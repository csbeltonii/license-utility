const webApiUrl = "https://localhost:44375/api";

export interface Company {
  companyId: number;
  companyName: string;
  accountNumber: number;
  licenses: number;
  licensesMobileCount: number;
  trialLicenses: number;
  licenseChanges: [];
}

export interface LicenseChange {
  companyId: number;
  licenseBefore: number;
  licenseAfter: number;
  changeDate: Date;
  changeType: string;
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
  companyId: data.companyId,
  companyName: data.companyName,
  accountNumber: data.accountNumber,
  licenses: data.licenses,
  licensesMobileCount: data.licensesMobileCount,
  trialLicenses: data.trialLicenses === null ? 0 : data.trialLicenses,
  licenseChanges: [],
});

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

export const getCompanyAsync = async (
  accountNumber: number
): Promise<Company> => {
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
    return {
      companyId: 0,
      companyName: "",
      accountNumber: 0,
      licenses: 0,
      licensesMobileCount: 0,
      trialLicenses: 0,
      licenseChanges: [],
    };
  }
};

export const updateCompany = async (
  updatedCompany: Company
): Promise<boolean> => {
  const request = new Request(
    `${webApiUrl}/Company/${updatedCompany.companyId}`,
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

export const getLicenseChanges = async (
  companyId: number
): Promise<LicenseChange[]> => {
  const request = new Request(`${webApiUrl}/LicenseChange/${companyId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);

  if (response.ok) {
    const changes = await response.json();

    return changes;
  } else {
    return [];
  }
};
