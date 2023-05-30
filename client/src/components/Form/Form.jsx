import { useState } from "react";
import EmailInput from "./EmailInput";
import { toast } from "react-toastify";
import axios from "axios";
import TimezoneSelect from 'react-timezone-select';
import "datejs";
import "./style.css";

const Form = ({ loginUser }) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [timezone, setTimezone] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [guests, setGuests] = useState([]);

  const handleDateTime = ({ date, timezone }) => {
    const inputIsoDateTime = date;
    const inputDate = Date.parse(inputIsoDateTime);
    const timezoneName = "America/New_York";
    const adjustedDate = inputDate.setTimezone(timezoneName);
    const outputIsoDateTime = adjustedDate.toISOString();
    return outputIsoDateTime;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!loginUser) return toast.error("Sign in to your google account first!");
    if (!summary || !description || !timezone || !startDateTime || !endDateTime || !guests) return toast.warning("Enter all the fields to proceed!");

    const startTime = Date.parse(new Date(startDateTime).toISOString()).setTimezone(timezone["value"]).toISOString();
    const endTime = Date.parse(new Date(endDateTime).toISOString()).setTimezone(timezone["value"]).toISOString()

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/create-event`, {
      summary,
      description,
      timezone: timezone["value"],
      startTime,
      endTime,
      guests
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data);
      })
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
      <button type="submit">
        Create Event
      </button>
    </form>
  )
}

export default Form