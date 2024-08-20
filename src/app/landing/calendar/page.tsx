'use client';

import React, { useState, useEffect } from "react";
import { Calendar, Scheduler, SchedulerExistingEvent, useArrayState } from "@cubedoodl/react-simple-scheduler";
import { Checkbox, FormGroup, FormControlLabel} from "@mui/material";

export default function Home(){

  // Current selected event and master event array
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState(null);

  // Array of user objects
  // Each user object contains a name, an active state, and an array of events
  const [users, setUsers, addUser] = useArrayState(null);

  // Current user of the calendar
  const [user, setUser] = useState(null);

  // Checking if the filter button is checked
  const [filter, setFilter] = useState(false);

  // Editing the truth values of the filter states
  const handleFilterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      let filterKey = "";
      if (e.target.id === "EricCheck") {
          filterKey = "Eric"
      }
      if (e.target.id === "FelicityCheck") {
          filterKey = "Felicity"
      }
      if (e.target.id === "AnnieCheck") {
          filterKey = "Annie"
      }
      setFilterStates(prevState => ({
        ...prevState,
        [filterKey]: !prevState[filterKey]
      }));
  }

  // Event filtering
  useEffect(() => {
    console.log(filterStates)
    let tempEvents: any[] = [];
    if (filterStates["Eric"]) {
      tempEvents = tempEvents.concat(ericEvents);
    }
    if (filterStates["Felicity"]) {
      tempEvents = tempEvents.concat(felicityEvents);
    }
    if (filterStates["Annie"]) {
      tempEvents = tempEvents.concat(annieEvents);
    }
    setEvents(tempEvents);
  }, [filterStates])

  // Function to hit the add-events api endpoint
  const userEventSave = async () => {
    console.log(JSON.stringify(createEventSaveBody()));
    const response = await fetch('api/add-events', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createEventSaveBody())
    })
    const result = await response.json();
    console.log(result);
  }

  const userEventLoad = async () => {
    const response = await fetch('/api/get-events?user=Eric', {
      method: "GET",
    })
    const result = await response.json();
    console.log(result.rows[0].data);
    result.rows[0].data.forEach((event: SchedulerExistingEvent) => {
      event.from = new Date(event.from);
      event.to = new Date(event.to);
    })
    setEvents(result.rows[0].data)
    console.log(events);
  }

  // Function to create the body object for the add-events request
  const createEventSaveBody = () => {
    return {
      "user": user,
      "events": JSON.stringify(events)
    }
  }

  return (
    <>
    <div className="flex justify-end items-center gap-10">
      <select
        value={user}
        onChange={(e) => setUser(e.target.value)}
      >
        <option value="Eric">Eric</option>
        <option value="Felicity">Felicity</option>
        <option value="Annie">Annie</option>
      </select>
      <div>
        <button className={`border p-2 rounded-md text-white ${
          filter ? 'bg-green-500 border-green-500 hover:bg-green-700 hover:bg-green-700' : 'bg-red-500 border-red-500 hover:bg-red--700 hover:border-red-500'
        }`} id="filter" onClick={() => setFilter(!filter)}>Filter</button>
        <button onClick={() => userEventSave()} className="border border-black p-2 rounded-md text-black m-4" id="filter">Save</button>
        <button onClick={() => userEventLoad()} className="border border-black p-2 rounded-md text-black m-4" id="filter">Load</button>
      </div>
      
      <FormGroup className="h-100">
        <FormControlLabel control={<Checkbox size="large" id="EricCheck" onChange={handleFilterClick}/>} label="Eric" />
        <FormControlLabel control={<Checkbox size="large" id="FelicityCheck" onChange={handleFilterClick}/>} label="Felicity" />
        <FormControlLabel control={<Checkbox size="large" id="AnnieCheck" onChange={handleFilterClick}/>} label="Annie" />
      </FormGroup>
      <Scheduler
              
              // This is horrendous. I promise to fix it
              events={events}
              selected={selected}
              setSelected={setSelected}
              onRequestAdd={(evt) => {
                switch (user) {
                  case 'Eric':
                    evt.style={
                      color: "white",
                      backgroundColor: "blue"
                    }
                    addEricEvent(evt)
                    break;
                  case 'Felicity':
                    evt.style={
                      color: "white",
                      backgroundColor: "green"
                    }
                    addFelicityEvent(evt)
                    break;
                  case 'Annie':
                  evt.style={
                    color: "white",
                    backgroundColor: "red"
                  }
                  addAnnieEvent(evt)
                  break;
                }
                addEvent(evt)
              }}
              onRequestEdit={(evt) => alert("Edit element requested")}
              style={{
                container: {
                  width: "80%",
                  height: "100%",
                  color: "black",
                  padding: "20px"
                },
                head: {
                  // TODO
                },
                body: {
                  // TODO
                }
              }}
            />
          
    </div>
      
    </>
  );
}