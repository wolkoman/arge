export const Responsive = ({ children }) => {
  return (
    <div className="mx-auto px-4 w-full sm:w-5/6 md:w-5/6 lg:w-2/3 xl:1/3">
      {children}
    </div>
  );
};
