import "./EventModal.css";

import { X } from "lucide-react";

function EventModal({

    isOpen,

    onClose,

    event

}) {

    if (!isOpen || !event) return null;

    return (

        <div className="event-modal-overlay">

            <div className="event-modal">

                <button

                    className="close-modal-btn"

                    onClick={onClose}

                >

                    <X size={22} />

                </button>

                <h2>

                    Task Details

                </h2>

                <div className="event-details">

                    <div>

                        <span>Task</span>

                        <p>{event.title}</p>

                    </div>

                    <div>

                        <span>Description</span>

                        <p>{event.description}</p>

                    </div>

                    <div>

                        <span>Assigned By</span>

                        <p>{event.assignedBy}</p>

                    </div>

                    <div>

                        <span>Assigned To</span>

                        <p>{event.assignedTo}</p>

                    </div>

                    <div>

                        <span>Deadline</span>

                        <p>{event.date}</p>

                    </div>

                    <div>

                        <span>Status</span>

                        <p>

                            {

                                event.completed

                                    ? "✅ Completed"

                                    : "⏳ Pending"

                            }

                        </p>

                    </div>

                </div>

                <div className="event-modal-actions">

                    <button

                        className="open-project-btn"

                    >

                        Open Project

                    </button>

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default EventModal;