import Link from "next/link";
import React from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

function Header() {
  const Router = useRouter();
  let [currentUser, setCurrentUser] = React.useState("");

  React.useEffect(() => {
    let getUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, []);

  let signOut = async (e: any) => {
    e.preventDefault();
    await Auth.signOut();
    Router.push("/", "/", { shallow: false });
    Router.reload();
  };

  if(Router.pathname === '/create-job') {
    return <div/>
  }

  return (
    <nav className="navbar navbar-expand-lg shadow-2xl pt-2 relative flex w-full justify-between border-b-1 border-grey-500" style={{paddingBottom: '1rem', boxShadow: "0 2px 10px 0 rgb(116 129 141 / 20%)"}}>
      <div className="w-full flex flex-wrap container">
        <div className="flex items-center flex-shrink-0 text-white mr-6 pr-4">
          <Link href="/" className="font-lightbold text-xl tracking-tight text-gray-600">Junior Web Devs</Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <ul className="navbar-nav  mr-auto lg:flex lg:flex-row justify-between py-2">
            <Link href="/create-job" className="pr-4  text-gray-700 hover:text-gray-800 focus:text-gray-800">
              Post a job
            </Link>
            {Boolean(currentUser) && (
              <Link href="/profile" className="pr-4  text-gray-700 hover:text-gray-700 focus:text-gray-700">
                Profile
              </Link>
            )}
          </ul>
          <div>
            {Boolean(currentUser) && (
              <Link href="/profile" onClick={signOut} className="text-gray-700 hover:text-gray-800 focus:text-gray-800">
                Log out
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
