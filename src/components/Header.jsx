import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useLazySearchStationByQueryQuery } from "../features/station/stationApi.js";
import { EvCharger, Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchStationByQuery, { data, isLoading, isError, isSuccess, error }] =
    useLazySearchStationByQueryQuery();
  const [showList, setShowList] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleSearch = (e) => {
    clearTimeout(timeoutRef.current);

    if (e.target.value.length < 2) return;

    timeoutRef.current = setTimeout(async () => {
      try {
        await searchStationByQuery(e.target.value).unwrap();
        setShowList(true);
        console.log(data);
      } catch (error) {
        console.log(error);
        setShowList(false);
      }
    }, 1000);

    console.log("goin");
  };

  React.useEffect(() => {
    return clearTimeout(timeoutRef.current);
  }, []);
  return (
    <div className="w-full relative max-w-2xl rounded-full py-2 px-4 bg-blue-50 overflow-show">
      <div className="flex pl-8 relative">
        <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-800" />
        <input
          type="text"
          name="search"
          placeholder="Search stations or places"
          className={`text-slate-800 outline-none border-0 w-full`}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {showList && data?.stations && (
        <div className="w-full absolute top-[60px] left-0 flex bg-white p-1 rounded-xl gap-1">
          <ul>
            {data.stations.map((station) => (
              <Link
                key={station._id}
                to={`/${station.location.coordinates[1]}/${station.location.coordinates[0]}`}
                className="py-2 px-4 relative pl-12 text-slate-800 flex items-center"
              >
                <EvCharger className="absolute top-1/2 left-3 -translate-y-1/2" />
                {station.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <header className="w-full header z-[1001]">
      <div className="h-16 flex  items-center p-4">
        {/* <p>Dullat's EV</p> */}
        <Search />
        <ul className="flex gap-4 ml-auto">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
