import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Link, useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { useState } from "react";
import { capitalizeName } from "@/lib/utils";

type StabBlockProps = {
  value: string | number;
  label: string;
};

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [following, setFollowing] = useState(false);

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {capitalizeName(currentUser.name)}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username.toLowerCase()}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={following ? 19 : 18} label="Followers" />
              <StatBlock value={27} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button
                type="button"
                className={`${
                  following ? "bg-gray-600" : "shad-button_primary"
                } px-8`}
                onClick={() => {
                  setFollowing(!following);
                }}
              >
                {following ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border w-full border-dark-4/80 my-2" />
      {currentUser.posts.length === 0 ? (
        <p className="text-light-4 mt-10 text-center w-full">
          No posts available
        </p>
      ) : (
        <GridPostList posts={currentUser.posts} showUser={false} />
      )}
    </div>
  );
};

export default Profile;
