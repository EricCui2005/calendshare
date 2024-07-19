'use client';

import React, { useState, useEffect } from "react";
import { Calendar, Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

export default function Home(){
  const [selected, setSelected] = useState(new Date());

  // Master event array to render selected events
  const [events, setEvents, addEvent] = useArrayState(null);

  // Temporary events to store individual events
  const [ericEvents, setEricEvents, addEricEvent] = useArrayState(null);
  const [felicityEvents, setFelicityEvents, addFelicityEvent] = useArrayState(null);
  const [annieEvents, setAnnieEvents, addAnnieEvent] = useArrayState(null);

  // Temporary manual checks for each checkbox
  const [eric, setEric] = useState(false);
  const [felicity, setFelicity] = useState(false);
  const [annie, setAnnie] = useState(false);

  // Storing the calendar user
  const [user, setUser] = useState("Eric");

  // Checkbox updating
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.id === "ericCheck") {
          setEric(!eric);
      }
      if (e.target.id === "felicityCheck") {
          setFelicity(!felicity);
      }
      if (e.target.id === "annieCheck") {
          setAnnie(!annie);
      }
  }

  useEffect(() => {
    let tempEvents: any[] = [];
    if (eric) {
      tempEvents = tempEvents.concat(ericEvents);
    }
    if (felicity) {
      tempEvents = tempEvents.concat(felicityEvents);
    }
    if (annie) {
      tempEvents = tempEvents.concat(annieEvents);
    }
    setEvents(tempEvents);
  }, [eric, felicity, annie])

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
      <FormGroup className="h-100">
        <FormControlLabel control={<Checkbox size="large" id="ericCheck" onChange={handleClick}/>} label="Eric" />
        <FormControlLabel control={<Checkbox size="large" id="felicityCheck" onChange={handleClick}/>} label="Felicity" />
        <FormControlLabel control={<Checkbox size="large" id="annieCheck" onChange={handleClick}/>} label="Annie" />
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
                  border: "1px solid black",
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