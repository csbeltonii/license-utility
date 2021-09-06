import { FC } from "react";
import { PrimaryButton } from "./Styles/Styles";
import { useForm } from "react-hook-form";

type Props = {
  handleSearchChange: any;
};

const DealerListSearch: FC<Props> = ({ handleSearchChange }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <div className="col-5 m-1 p-2">
      <form
        className="d-flex"
        method="get"
        id="search-form"
        onSubmit={handleSubmit(handleSearchChange)}
      >
        <input
          type="text"
          id="search-bar"
          className="form-control mt-2 mb-2"
          ref={register}
          name="search"
          placeholder="Search by Account Number or Dealership"
        />
        <PrimaryButton
          type="submit"
          className="btn btn-success m-2"
          id="btn-submit"
        >
          Search
        </PrimaryButton>
      </form>
    </div>
  );
};

export default DealerListSearch;
