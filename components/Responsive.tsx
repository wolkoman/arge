export const Responsive = ({ children }) => {
  return (
    <div className="mx-auto px-4 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:1/2">
      {children}
    </div>
  );
};
