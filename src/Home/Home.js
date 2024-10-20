import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import { useLocation } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import Cookie from "js-cookie";

function App() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  console.log("document", Cookie.get());

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const [data, setData] = useState([]);
  const [removeData, setRemoveData] = useState([]);
  const [count, setCount] = useState("");
  const location = useLocation();
  const admin = location?.state?.isAdmin?.isAdmin;
  const message = location?.state?.isAdmin?.message;

  console.log(admin);

  const date = new Date();
  let day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getUTCFullYear();

  if (day.toLocaleString.length <= 1 && month.toLocaleString.length <= 1) {
    day = `0${day}`;
    month = `0${month}`;
  }

  let navigate = useNavigate();
  const navigationPage = () => {
    let path = `/bookyourslot`;
    navigate(path);
  };

  const appointments = async () => {
    const response = await fetch("http://localhost:8000/appointments", {
      credentials: "include",
    });
    const data = await response.json();
    const result = data?.appointments;
    setData(result);
    try {
      if (response?.status == 200) {
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteId = (id) => {
    setRemoveData(id);
    setCount(data.length);
    toggleModal();
  };

  const confirmSlot = async () => {
    const response = await fetch(
      `http://localhost:8000/deleteAppointment/${removeData}`,
      { credentials: "include" }
    );
    const data = await response.json();
    setCount(count - 1);
    console.log(data);
    toggleModal();
  };

  const pendingAppointment = () => {
    navigate("/pending");
  };

  useEffect(() => {
    appointments();
  }, [count]);

  return (
    <div className="App">
      <Header />
      <Navbar />
      {/* <Loader visible={loader} /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "20%",
          marginTop: "5%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 className="h3">
            District Level VC/Meeting Booking Status as on {day}-{month}-{year}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            left: "1%",
            gap: 30,
          }}
        >
          {admin == true && (
            <div>
              <button className="slotBook" onClick={pendingAppointment}>
                Pending Appointments
              </button>
            </div>
          )}
          <div>
            <button className="slotBook" onClick={navigationPage}>
              Book Your Slot
            </button>
          </div>
        </div>
      </div>

      <div style={{}}>
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
            {admin == true && <th className="cancel">Cancel</th>}
          </tr>
          {data.map((arrayItem, index) => {
            const indexNumber = index + 1;
            return (
              <tr key={arrayItem?._id} onClick={() => deleteId(arrayItem?._id)}>
                <th style={{ fontWeight: "normal" }}>{indexNumber}</th>
                <th style={{ fontWeight: "normal" }}>{arrayItem?.date}</th>
                <th style={{ fontWeight: "normal" }}>
                  {arrayItem?.startTime} to {arrayItem?.endTime}
                </th>
                <th style={{ fontWeight: "normal" }}>{arrayItem?.location}</th>
                <th style={{ fontWeight: "normal" }}>{arrayItem?.subject}</th>
                <th style={{ fontWeight: "normal" }}>
                  {arrayItem?.participants}
                </th>
                <th style={{ fontWeight: "normal" }}>
                  {arrayItem?.department}
                </th>
                <th style={{ fontWeight: "normal" }}>
                  {arrayItem?.phoneNumber}
                </th>
                <th style={{ fontWeight: "normal" }}>{arrayItem?.status}</th>
                {admin == true && (
                  <div style={{ marginTop: 15, marginLeft: 20 }}>
                    <MdOutlineCancel />
                  </div>
                )}
              </tr>
            );
          })}
        </table>
        <br></br>
      </div>
      <div>
        <>
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h3>Confirm</h3>
                <p style={{ color: "black" }}>Do you want to delete the Slot</p>
                <button className="Yes-Button" onClick={() => confirmSlot()}>
                  Yes
                </button>
                <button className="No-Button">No</button>

                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default App;
