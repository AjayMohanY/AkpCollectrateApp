import React, { useEffect, useState, useMemo } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Header from "../header/Header";
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";

const PendingAppointments = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(" ");
  const [count, setCount] = useState("");

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const pendingAppointments = async () => {
    const response = await fetch("http://localhost:8000/pendingAppointments", {
      credentials: "include",
    });
    const result = await response.json();
    const appointment = result?.appointments;
    setData(appointment);
    console.log(sessionStorage.getItem("Value"));
  };

  const confirmSlot = async () => {
    const response = await fetch(
      `http://localhost:8000/approveAppointment/${selectedId}/approved`,
      {
        credentials: "include",
      }
    );
    const result = await response.json();
    setCount(count - 1);
    console.log("confirmSlot", result);
    toggleModal();
  };

  const handleSubmit = (id, indexNumber) => {
    setSelectedId(id);
    setCount(data.length);
    toggleModal();
  };

  useEffect(() => {
    pendingAppointments();
  }, [count]);

  return (
    <div style={{}}>
      <Header />
      <Navbar />
      <div className="mainHeader">
        <h3>Pending Appointments</h3>
      </div>
      <marquee behavior="scroll" direction="left" className="scrollText">
        if You want confirm the slot, just click on the
        <TiTick size={20} />
        and confirm..!
      </marquee>

      {data.length > 0 ? (
        <div>
          <table className="table" width="100%">
            <tr>
              <th className="sNo">S.NO</th>
              <th>Booking Date</th>
              <th className="time">Time</th>
              <th className="location">Location</th>
              <th className="subject">Subject</th>
              <th className="participants">Participants</th>
              <th>Department</th>
              <th className="phone">Phone Number</th>
              <th>Status</th>

              <th className="accept">Accept</th>
              <th className="cancel">Cancel</th>
            </tr>
            <tbody>
              {data.map((arrayItem, index) => {
                const indexNumber = index + 1;
                return (
                  <tr
                    key={arrayItem?._id}
                    onClick={() => handleSubmit(arrayItem?._id, indexNumber)}
                  >
                    <th className="fontWeight">{indexNumber}</th>
                    <th className="fontWeight">{arrayItem?.date}</th>
                    <th className="fontWeight">
                      {arrayItem?.startTime} to {arrayItem?.endTime}
                    </th>
                    <th className="fontWeight">{arrayItem?.location}</th>
                    <th className="fontWeight">{arrayItem?.subject}</th>
                    <th className="fontWeight">{arrayItem?.participants}</th>
                    <th className="fontWeight">{arrayItem?.department}</th>
                    <th className="fontWeight">{arrayItem?.phoneNumber}</th>
                    <th className="fontWeight">{arrayItem?.status}</th>
                    <th className="tableRow">
                      <div style={{ marginLeft: 10 }}>
                        <TiTick size={25} />
                      </div>
                    </th>
                    <th className="tableRow">
                      <div style={{ marginTop: 5, marginLeft: 15 }}>
                        <MdOutlineCancel />
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3 style={{ textAlign: "center", marginTop: 20 }}>
            No slots are available
          </h3>
        </div>
      )}

      <div>
        <>
          {/* <button onClick={toggleModal} className="btn-modal">
            Open
          </button> */}

          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h3>Confirm</h3>
                <p style={{ color: "black" }}>Do You want to Accept the Slot</p>
                <button className="Yes-Button" onClick={() => confirmSlot()}>
                  Yes
                </button>
                <button className="No-Button" onClick={toggleModal}>
                  No
                </button>

                {/* <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button> */}
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default PendingAppointments;
