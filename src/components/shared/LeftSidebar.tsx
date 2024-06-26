import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { capitalizeName } from "@/lib/utils";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    isSuccess && navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar max-w-sm">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/blaze.png"
            alt="logo"
            width={220}
            height={36}
            className=""
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{capitalizeName(user.name)}</p>
            <p className="small-regular text-light-3">@{user.username.toLowerCase()}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-2">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt="link.label"
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="body-bold">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
