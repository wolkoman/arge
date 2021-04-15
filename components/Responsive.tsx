export const Responsive = ({ children }) => {
  return (
    <div className="mx-auto px-4 w-full sm:w-5/6 md:w-3/4 lg:w-1/2 xl:1/3">
      {children}
    </div>
  );
};
