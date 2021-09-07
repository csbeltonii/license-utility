import { PageNumberIndicator, PrimaryButton } from "./Styles/Styles";
import { FC } from "react";

interface Props {
  nextPage: () => void;
  previousPage: () => void;
  currentPage: number;
  lastPage: number;
  disablePreviousButton: boolean;
  disableNextButton: boolean;
}

const CustomPagination: FC<Props> = ({
  nextPage,
  previousPage,
  currentPage,
  lastPage,
  disableNextButton,
  disablePreviousButton,
}) => {
  return (
    <div className="d-flex justify-content-between">
      <PrimaryButton
        className="btn"
        onClick={previousPage}
        disabled={disablePreviousButton}
      >
        Previous
      </PrimaryButton>
      <PageNumberIndicator>
        Page {currentPage} of {lastPage}
      </PageNumberIndicator>
      <PrimaryButton
        id="btn-next"
        className="btn"
        onClick={nextPage}
        disabled={disableNextButton}
      >
        Next
      </PrimaryButton>
    </div>
  );
};

export default CustomPagination;
