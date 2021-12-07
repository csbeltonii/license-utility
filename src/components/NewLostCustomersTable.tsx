import { FC } from "react";
import { CustomerChanges } from "../data/companies";

interface Props {
  customerChanges: CustomerChanges | undefined;
}

const NewLostCustomersTable: FC<Props> = ({ customerChanges }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>Retention</th>
        </tr>
        <tr>
          <th className="text-center">New</th>
          <th className="text-center">Lost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">{customerChanges?.newCustomers}</td>
          <td className="text-center">{customerChanges?.lostCustomers}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NewLostCustomersTable;
