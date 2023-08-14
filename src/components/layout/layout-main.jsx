import NavigationBar from "../navbar/navbar-main";

const LayoutMain = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <main className="container mt-20">{children}</main>
    </>
  );
};

export default LayoutMain;
