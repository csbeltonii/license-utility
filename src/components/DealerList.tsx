import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DealerList: FC<Props> = ({ children }) => {
  return (
    <div className="m-1 p-2">
      <table className="table table-hover table-sm">{children}</table>
    </div>
  );
};

export default DealerList;
