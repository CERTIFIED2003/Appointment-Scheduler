import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backend } from "../../hooks/backend";
import TimezoneSelect from 'react-timezone-select';
import EmailInput from "./EmailInput";
import "./style.css";

const Form = ({ loginUser }) => {
  const { backendURL } = backend();

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [timezone, setTimezone] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    if (!loginUser) return toast.error("Sign in to your google account first!");
    if (!summary || !description || !timezone || !startDateTime || !endDateTime || !guests) return toast.warning("Enter all the fields to proceed!");

    const startDateTimeUTC = new Date(startDateTime).toISOString();
    const endDateTimeUTC = new Date(endDateTime).toISOString();

    setIsLoading(true);
    axios.post(`${backendURL}/api/create-event`, {
      userId: loginUser._id,
      summary,
      description,
      timezone: timezone["value"],
      startTime: startDateTimeUTC,
      endTime: endDateTimeUTC,
      guests
    })
      .then(res => {
        toast.success("Added event to your calendar successfully!");
        setTimeout(() => {
          if (guests.length > 0) toast.success("Also sent invitation mail to guests!");
        }, 5000);
      })
      .catch(err => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
        setSummary("");
        setDescription("");
        setTimezone("");
        setStartDateTime("");
        setEndDateTime("");
        setGuests([]);
      });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        <label htmlFor="summary">Summary</label>
        <br />
        <input
          type="text"
          id="summary"
          placeholder="Enter topic title"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="desc">Description</label>
        <br />
        <textarea
          id="desc"
          placeholder="Enter topic description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="timezone">Timezome</label>
        <br />
        <TimezoneSelect
          id="timezone"
          value={timezone}
          onChange={setTimezone}
        />
      </div>
      <br />
      {timezone && (
        <>
          <div>
            <label htmlFor="start">Start Time</label>
            <br />
            <input
              type="datetime-local"
              id="start"
              placeholder="Enter event's start time"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="end">End Time</label>
            <br />
            <input
              type="datetime-local"
              id="end"
              placeholder="Enter event's end time"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
            />
          </div>
          <br />
        </>
      )}
      <EmailInput
        guests={guests}
        setGuests={setGuests}
      />
      <br />
      <button disabled={isLoading} type="submit">
        {isLoading ? "Creating" : "Create Event"}
      </button>
    </form>
  )
}

export default Form