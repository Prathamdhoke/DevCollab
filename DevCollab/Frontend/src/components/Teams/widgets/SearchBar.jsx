import "./SearchBar.css";

import { Search } from "lucide-react";

function SearchBar() {

    return (

        <div className="team-search-bar">

            <Search size={20} />

            <input

                type="text"

                placeholder="Search your teams..."

            />

        </div>

    );

}

export default SearchBar;