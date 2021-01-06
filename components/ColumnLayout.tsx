export const ColumnLayout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <div className="flex-grow w-1/3">{children[0]}</div>
      <div className="flex-grow w-2/3">{children[1]}</div>
    </div>
  );
};
