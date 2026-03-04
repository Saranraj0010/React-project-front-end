import { useState } from "react";
import CommenHeader from "../commenHeader/CommenHeader";
import logo from "../../assets/profile4.jpg";

const Calendar = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteText, setNoteText] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  const formatKey = (day) => `${year}-${month + 1}-${day}`;

  const handleSaveNote = () => {
    if (!noteText.trim()) return;

    setNotes({
      ...notes,
      [selectedDate]: noteText
    });

    setSelectedDate(null);
    setNoteText("");
  };

  const handleDeleteNote = () => {
    const updatedNotes = { ...notes };
    delete updatedNotes[selectedDate];
    setNotes(updatedNotes);
    setSelectedDate(null);
    setNoteText("");
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={"empty-" + i}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const key = formatKey(day);

      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => {
            setSelectedDate(key);
            setNoteText(notes[key] || "");
          }}
          className={`p-3 rounded-xl cursor-pointer transition-all duration-300 relative min-h-[90px] border
            ${
              isToday
                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                : "bg-blue-50 border-blue-100 hover:bg-blue-100"
            }`}
        >
          <div className="font-semibold">{day}</div>

          {notes[key] && (
            <div className="text-xs mt-2 bg-blue-200 text-blue-900 px-2 py-1 rounded-md truncate">
              📝 {notes[key]}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white p-4">
      <CommenHeader title={"Calendar"} logo={logo} />

      <div className="bg-white m-5 rounded-2xl p-6 shadow-xl border border-blue-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevMonth}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Prev
          </button>

          <h2 className="text-2xl font-bold text-blue-700">
            {months[month]} {year}
          </h2>

          <button
            onClick={nextMonth}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-3 mb-3 text-center font-semibold text-blue-700">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-3">
          {renderDays()}
        </div>
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl border border-blue-200">
            <h3 className="text-lg font-bold text-blue-700 mb-4">
              {notes[selectedDate] ? "Edit Note" : "Add Note"}
            </h3>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Write your note..."
            />

            <div className="flex justify-between">
              {notes[selectedDate] && (
                <button
                  onClick={handleDeleteNote}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              )}

              <div className="flex gap-3 ml-auto">
                <button
                  onClick={() => setSelectedDate(null)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;