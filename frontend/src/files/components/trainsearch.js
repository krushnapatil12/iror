import React, { useState } from "react";

import "../files.css";
import "./trainsearch.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Schedule from "../schedule";
function Trainsearch() {
  const [ID, setID] = useState({
    tID: "",
  });

  const [flag, setFlag] = useState(false);

  const [trainSchedule, setTrainSchedule] = useState([]);
  let sNo=0;
  function showSchedule(station) {
    sNo++;
    station.sNo=sNo;
    return <Schedule props={ station }/>;
  }

  function handleChange(event) {
    const newValue = event.target.value;
    setID((prevValue) => {
      return {
        tID: newValue,
      };
    });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(ID);
    try {
      const response = await fetch("http://localhost:5000/getRoute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      });
      let res = await response.json();
      console.log(res);
      setTrainSchedule((prevValue) => {
        return res;
      });
      setFlag(true);
      console.log(trainSchedule);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="trainsearch">
      <div className="flex-child">
        <h2>Search Train</h2>
        <form>
          <TextField
            required
            id="outlined-required"
            label="Train Number"
            onChange={handleChange}
          />
          <Button onClick={onSubmitForm} variant="contained">
            FIND
          </Button>
        </form>
      </div>
      <div className="flex-child">
        <div>
          {flag == false ? (
            " "
          ) : (
            <div>
              {trainSchedule.flag == false ? (
                <div>"No Result found"</div>
              ) : (
                <div className="trainSchedule">
                  <span className="H1"><h1>Train Schedule</h1></span>
                  <div className="info">
                      <div>
                          <h3>Train Number</h3>
                          <p>{trainSchedule.trainId}</p>
                      </div>
                      <div>
                          <h3>Train Name</h3>
                          <p>{trainSchedule.trainName}</p>   
                      </div>
                      <div>
                          <h3>Start Station</h3>
                          <p>{trainSchedule.startStation}</p>
                      </div>
                      <div>
                          <h3>Destination Station</h3>
                          <p>{trainSchedule.destinationStation}</p>
                      </div>
                      <div>
                          <h3>Runs On</h3>
                          <p>{trainSchedule.runsOn}</p>
                      </div>
                  </div>
                  <div style={{marginLeft: '100px', marginRight: '100px'}}>
                      <table className="content">
                          <thead>
                              <tr>
                                  <th>Serial No.</th>
                                  <th>Station Name</th>
                                  <th>Arrival Time</th>
                                  <th>Departure Time</th>
                              </tr>
                          </thead>
                          <tbody>
                              {trainSchedule.stations.map(showSchedule)}  
                          </tbody>
                      </table>
                  </div>
              </div>
                // <div>
                //   {trainSchedule.stations.map(showSchedule)}
                // </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trainsearch;
