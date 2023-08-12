import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-provider";
import Cookies from "js-cookie";
import { toastNotify } from "../../lib/utils";

function NavList() {
  const { data, setData } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setData(null);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    toastNotify({
      type: "info",
      message: "Logout success",
    });
  };

  return (
    <ul className="my-2 flex flex-col items-end gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {data && (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue"
              className="flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2 normal-case lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt={data?.data ? data.data.fullname : "profile"}
                className="border border-green-500 p-0.5"
                src={`https://ui-avatars.com/api/?name=${data.data.fullname}&background=0D8ABC&color=fff`}
              />
              <Typography
                as="span"
                className="max-w-[180px] truncate text-sm font-medium text-gray-600"
              >
                {data.data.fullname}
              </Typography>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 text-blue-gray-100 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            <MenuItem className="flex items-center gap-2 rounded">
              <UserCircleIcon className="h-4 w-4" strokeWidth={2} />
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
              >
                Profile Menu
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
            >
              <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="red"
              >
                Logout
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </ul>
  );
}

export default function NavigationBar() {
  const [openNav, setOpenNav] = useState(false);
  const { data } = useContext(AuthContext);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <header className="border-b-2 bg-white ">
      <Navbar
        className="container bg-white bg-opacity-100 px-3 py-2 md:px-6"
        shadow={false}
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="inline-flex gap-1 text-xl font-extrabold text-green-500">
              Tokopedia Play
              <span className="block -translate-y-0 -rotate-6 bg-green-500 px-1 text-white lg:-translate-y-1">
                Clone
              </span>
            </h1>
          </Link>
          {data !== null ? (
            <>
              <div className="hidden lg:block">
                <NavList />
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                ) : (
                  <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                )}
              </IconButton>
            </>
          ) : (
            <Link to="/login">
              <Button size="md">Login</Button>
            </Link>
          )}
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </header>
  );
}
