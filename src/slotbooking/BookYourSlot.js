import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./SlotBook.css";
import Header from "../header/Header";
import Navbar from "../Navbar";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate, useNavigate } from "react-router-dom";

function BookYourSlot() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [starttime, setStartTime] = useState(new Date());
  const [endtime, setEndTime] = useState(new Date());
  const [department, setDepartment] = useState(" ");
  const [location, setLocation] = useState(" ");
  const [subject, setSubject] = useState(" ");
  const [listOfParticipents, setListOfParticipents] = useState(" ");
  const [phoneNumber, setPhoneNumebr] = useState(" ");

  const Reset = () => {
    setDepartment(" ");
    setLocation(" ");
    setSubject(" ");
    setListOfParticipents(" ");
    setPhoneNumebr(" ");
  };

  const formattedDate = `${startDate.getDate()}-${
    startDate.getMonth() + 1
  }-${startDate.getFullYear()}`;

  const formatedTime = `${starttime.getHours()}:${starttime.getMinutes()}`;

  const formatedEndTime = `${endtime.getHours()}:${endtime.getMinutes()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/addAppointment", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        date: formattedDate,
        startTime: formatedTime,
        endTime: formatedEndTime,
        department: department,
        location: location,
        subject: subject,
        participants: listOfParticipents,
        phoneNumber: phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      if (response.status == 200) {
        const message = await response?.json();
        alert(message?.message);
        navigate("/");
        e.target.value();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="BookYourSlotContainer">
        <h2 style={{ textAlign: "center", marginTop: 29 }}>Book Your Slot</h2>
        <form>
          <div className="row1Container">
            <div className="datePicker">
              <label>Request Date</label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="datepickerinside"
                format="MM-dd-y"
              />
            </div>
            <div className="startTime">
              <label>Start Time</label>
              <DatePicker
                selected={starttime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
            <div className="endTime">
              <label>End Time</label>
              <DatePicker
                selected={endtime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
          <br></br>
          <div className="row2Container">
            <div className="Department">
              <label>Department:</label>

              <select
                className="Dept"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option>Department</option>
                <option>Agriculture</option>
                <option>Housing</option>
                <option>Survey</option>
                <option>DRDA</option>
                <option>Transport</option>
                <option>Election cell</option>
              </select>
            </div>
            <div className="location">
              <label>Location:</label>
              <select
                className="loca"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Location Hall</option>
                <option>VC Hall</option>
                <option>Meeting Hall</option>
              </select>
            </div>

            <div className="subject">
              <label>Subject</label>
              <div className="subject-s">
                <input
                  type="text"
                  placeholder="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
          </div>
          <br />

          <br />
          <div className="row3Container">
            <label style={{}}>List of Participents:</label>
            <input
              type="text"
              style={{ height: 80, width: "98%" }}
              placeholder="List Of Participents"
              onChange={(e) => setListOfParticipents(e.target.value)}
            />
          </div>
          <div className="phoneNumber">
            <label>Phone Number:</label>
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumebr(e.target.value)}
              style={{
                width: "22rem",
                height: 40,
                borderWidth: 0.5,
                borderRadius: 20,
              }}
            />
          </div>
        </form>
        <br></br>
        <div className="submitButton">
          <button
            onClick={Reset}
            style={{
              width: 200,
              height: 40,
              backgroundColor: "lightred",
              textAlign: "center",
              marginTop: 20,
              borderRadius: 20,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            style={{
              width: 200,
              height: 40,
              backgroundColor: "lightgreen",
              textAlign: "center",
              marginTop: 20,
              borderRadius: 20,
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookYourSlot;
