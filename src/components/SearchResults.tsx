import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const search: string | null = searchParams.get("search" || "");

  React.useEffect(() => {
    const doGetCompanies = async () => {};
  });
};
