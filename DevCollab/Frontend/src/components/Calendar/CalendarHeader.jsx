import "./CalendarHeader.css";

import { CalendarDays } from "lucide-react";

function CalendarHeader({ events }) {

    const today = new Date();

    const formattedDate = today.toLocaleDateString(

        "en-IN",

        {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric"

        }

    );

    return (

        <header className="calendar-header">

            <div>

                <h1>

                    <CalendarDays size={34} />

                    Calendar

                </h1>

                <p>

                    {formattedDate}

                </p>

            </div>

            <div className="calendar-summary">

                <span>

                    🔴 {events.length} Upcoming Deadlines

                </span>

            </div>

        </header>

    );

}

export default CalendarHeader;