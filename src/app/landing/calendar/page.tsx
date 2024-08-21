'use client';
import React, { useState, useEffect, useContext } from "react";
import { Calendar, Scheduler, SchedulerExistingEvent, useArrayState } from "@cubedoodl/react-simple-scheduler";
import { Checkbox, FormGroup, FormControlLabel} from "@mui/material";
import { MyContext } from "../../MyContext";

export default function CalendarPage(){

  const { userId, groupId } = useContext(MyContext);

  const [groupMembers, setGroupMembers, addGroupMember] = useArrayState(null);
  const [selected, setSelected] = useState(new Date());

  // Events of group members (excluding user)
  const [memberEvents, setMemberEvents, addMemberEvent] = useArrayState(null);

  // Events of user
  const [userEvents, setUserEvents, addUserEvent] = useArrayState(null);

  // All events
  const [events, setEvents, addEvent] = useArrayState(null);

  // Loading group member data once on mount
  useEffect(() => {
    const getGroupMembers = async () => {
      
      // Querying
      const url = `../api/get-group-members?groupId=${groupId}`;
      const init = {
        method: "GET"
      };
      const result = await fetch(url, init);
      const members = await result.json();

      // Setting
      setGroupMembers(members);
    }

    // Calling
    getGroupMembers();
  }, []);

  // // Logging loaded group member data
  // useEffect(() => {
  //   console.log(groupMembers);
  // }, [groupMembers]);

  // Adding all group members events to corresponding arrays
  groupMembers.forEach((member: any) => {

    // Converting event data into SchedulerExistingEvent-readable format
    member.events?.forEach((event: SchedulerExistingEvent) => {
      event.from = new Date(event.from);
      event.to = new Date(event.to);
      
      // Adding to correct event arrays
      addEvent(event);
      if (member.personid == userId) {
        addUserEvent(event);
      } else {
        addMemberEvent(event);
      }
    })
  });
  
  const userEventSave = async () => {
    console.log(userId);
    console.log(JSON.stringify(createEventSaveBody()));
    const response = await fetch('../api/add-events', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createEventSaveBody())
    })
    const result = await response.json();
    console.log(result);
  }

  // Function to create the body object for the add-events request
  const createEventSaveBody = () => {
    return {
      "personId": userId,
      "events": JSON.stringify(userEvents)
    }
  }

  // Function to handle event adding
  const eventAdd = (evt: any) => {
    addEvent(evt);
    addUserEvent(evt);
  }

  return (
    <>
    <div className="flex justify-end items-center gap-10">
    <button onClick={() => userEventSave()} className="border border-black rounded-md w-36 h-8">Save Events</button>
      <Scheduler
              events={events}
              selected={selected}
              setSelected={setSelected}
              onRequestAdd={(evt) => {eventAdd(evt)}}
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