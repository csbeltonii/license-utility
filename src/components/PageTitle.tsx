interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return <h1 className="jumbrotron m-1 p-3">{title}</h1>;
};

export default PageTitle;
