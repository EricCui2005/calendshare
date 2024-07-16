'use client';

import React, { useState } from "react";
import { Calendar, Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";

export default function Home(){
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState(null);

  return (
    <>
      <Calendar
        selected={selected}
        setSelected={setSelected}
        style={{
          container: {
            width: "600px",
            height: "600px",
            color: "black"
          },
          head: {
            
          },
          body: {

          }
        }}
      />
      {/* <Scheduler
        events={events}
        selected={selected}
        setSelected={setSelected}
        onRequestAdd={(evt) => addEvent(evt)}
        onRequestEdit={(evt) => alert("Edit element requested")}
      /> */}
    </>
  );
}