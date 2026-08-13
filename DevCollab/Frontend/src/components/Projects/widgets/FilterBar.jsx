import "./FilterBar.css";

function FilterBar() {

    return (

        <div className="filter-bar">

            <div className="filter-group">

                <label>Status</label>

                <select>

                    <option>All</option>

                    <option>Active</option>

                    <option>Planning</option>

                    <option>Completed</option>

                </select>

            </div>

            <div className="filter-group">

                <label>Priority</label>

                <select>

                    <option>All</option>

                    <option>High</option>

                    <option>Medium</option>

                    <option>Low</option>

                </select>

            </div>

        </div>

    );

}

export default FilterBar;