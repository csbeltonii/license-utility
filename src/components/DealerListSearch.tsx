import { FC } from "react";

type Props = {
  handleSearchChange: any;
};

const DealerListSearch: FC<Props> = ({ handleSearchChange }) => {
  return (
    <div className="col-5 m-1 p-2">
      <input
        type="text"
        id="search-bar"
        className="form-control mt-2 mb-2"
        name="search"
        placeholder="Search by Account Number or Dealership"
        onInput={handleSearchChange}
      />
    </div>
  );
};

export default DealerListSearch;
