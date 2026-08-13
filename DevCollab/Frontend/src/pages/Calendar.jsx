import { useEffect, useState } from "react";

import "./Calendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import CalendarHeader from "../components/Calendar/CalendarHeader";
import EventModal from "../components/Calendar/EventModal";

import api from "../api/axios.js";

function Calendar() {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =====================================================
                    GET MY TASKS
    ===================================================== */

  const getMyTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks/my");

      if (response.data.success) {
        const formattedEvents = response.data.data.map((task) => {
          /*
                            Keep the deadline as YYYY-MM-DD
                            so timezone conversion does not
                            move the task to the previous day.
                        */

          const date = new Date(task.deadline).toISOString().split("T")[0];

          return {
            id: task._id,

            title: task.title,

            date: date,

            description: task.description || "",

            assignedBy: task.createdBy?.name || "Unknown",

            assignedTo: task.assignedTo?.name || "You",

            completed: task.status === "completed",
          };
        });

        setEvents(formattedEvents);
      }
    } catch (error) {
      console.log("Calendar Tasks Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
                    LOAD TASKS
    ===================================================== */

  useEffect(() => {
    getMyTasks();
  }, []);

  /* =====================================================
                    EVENT CLICK
    ===================================================== */

  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,

      title: info.event.title,

      date: info.event.startStr,

      description: info.event.extendedProps.description,

      assignedBy: info.event.extendedProps.assignedBy,

      assignedTo: info.event.extendedProps.assignedTo,

      completed: info.event.extendedProps.completed,
    });
  };

  /* =====================================================
                    LOADING
    ===================================================== */

  if (loading) {
    return (
      <div className="calendar-page">
        <div className="calendar-main">
          <p>Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      {/* =========================
                    CALENDAR HEADER
            ========================= */}

      <CalendarHeader events={events} />

      <div className="calendar-layout">
        {/* =========================
                        CALENDAR
                ========================= */}

        <div className="calendar-main">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="700px"
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prev,next today",

              center: "title",

              right: "dayGridMonth",
            }}
          />
        </div>

        {/* =========================
                    UPCOMING DEADLINES
                ========================= */}

        <aside className="upcoming-events">
          <h2>Upcoming Deadlines</h2>

          {events.length === 0 ? (
            <div className="event-item">
              <p>No upcoming deadlines.</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="event-item"
                onClick={() => setSelectedEvent(event)}
              >
                <h3>{event.title}</h3>

                <p>{event.date}</p>
              </div>
            ))
          )}
        </aside>
      </div>

      {/* =========================
                    EVENT MODAL
            ========================= */}

      <EventModal
        isOpen={selectedEvent !== null}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

export default Calendar;
