import NavigationBar from "../navbar/navbar-main";

const LayoutMain = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <main className="container">{children}</main>
    </>
  );
};

export default LayoutMain;
