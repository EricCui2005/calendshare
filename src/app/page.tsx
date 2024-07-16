'use client';

import React, { useState } from "react";
import { Calendar, Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";

export default function Home(){
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState(null);

  return (
    <>
      <Scheduler
        events={events}
        selected={selected}
        setSelected={setSelected}
        onRequestAdd={(evt) => addEvent(evt)}
        onRequestEdit={(evt) => alert("Edit element requested")}
        style={{
          container: {
            width: "800px",
            height: "800px",
            color: "black"
          },
          head: {
            // TODO
          },
          body: {
            // TODO
          }
        }}
      />
    </>
  );
}