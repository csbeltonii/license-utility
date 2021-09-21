interface Props {
  title: string | undefined;
}

const PageTitle = ({ title }: Props) => {
  return <h2 className="jumbrotron">{title}</h2>;
};

export default PageTitle;
