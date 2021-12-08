import { FC } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./Styles/Styles";

type FormData = {
  startDate: Date;
  endDate: Date;
};

interface Props {
  submitForm: (data: FormData) => Promise<void>;
}

const AuditForm: FC<Props> = ({ submitForm }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form-horizontal">
      <div className="row">
        <div className="col">
          <label htmlFor="startDate" className="form-label">
            From
          </label>
          <input
            ref={register}
            type="date"
            name="startDate"
            id="startDate"
            className="form-control col-3"
          />
        </div>

        <div className="col">
          <label htmlFor="endDate" className="form-label">
            To
          </label>
          <input
            ref={register}
            type="date"
            name="endDate"
            id="endDate"
            className="form-control"
          />
        </div>
      </div>
      <div className="d-flex m-1 justify-content-end">
        <PrimaryButton type="submit" className="btn">
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
};

export default AuditForm;
