'use client';

import React, { useState } from "react";
import { Calendar, Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

export default function Home(){
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState(null);

  // Temporary checks 
  const [eric, setEric] = useState(false);
  const [felicity, setFelicity] = useState(false);
  const [annie, setAnnie] = useState(false);

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

  return (
    <>
    <div className="flex justify-end items-center gap-10">
      <FormGroup className="testBorder h-100">
        <FormControlLabel control={<Checkbox size="large" id="ericCheck" onChange={handleClick}/>} label="Eric" />
        <FormControlLabel control={<Checkbox size="large" id="felicityCheck" onChange={handleClick}/>} label="Felicity" />
        <FormControlLabel control={<Checkbox size="large" id="annieCheck" onChange={handleClick}/>} label="Annie" />
      </FormGroup>
      <Scheduler
              events={events}
              selected={selected}
              setSelected={setSelected}
              onRequestAdd={(evt) => {
                var color;
                if (eric) {
                  color = "blue";
                }
                if (felicity) {
                  color = "green";
                }
                if (annie) { 
                  color = "red";
                }
                evt.style={
                  color: "white",
                  backgroundColor: color
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