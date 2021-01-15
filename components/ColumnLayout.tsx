export const ColumnLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow md:w-1/3">{children[0]}</div>
      <div className="flex-grow md:w-2/3">{children[1]}</div>
    </div>
  );
};
