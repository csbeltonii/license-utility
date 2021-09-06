import { FC } from "react";

const DealerTableHeader: FC = () => {
  return (
    <thead>
      <tr>
        <th>Account #</th>
        <th>Company</th>
        <th className="text-end">Desktop</th>
        <th className="text-end">Mobile</th>
        <th className="text-end">Trial</th>
      </tr>
    </thead>
  );
};

export default DealerTableHeader;
