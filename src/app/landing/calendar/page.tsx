'use client';
import React, { useState, useEffect, useContext } from "react";
import { Calendar, Scheduler, SchedulerExistingEvent, useArrayState } from "@cubedoodl/react-simple-scheduler";
import { Checkbox, FormGroup, FormControlLabel} from "@mui/material";
import { MyContext } from "../../MyContext";

export default function CalendarPage(){
  console.log("Mounting");

  const { userId, groupId } = useContext(MyContext);

  const [groupMembers, setGroupMembers, addGroupMember] = useArrayState(null);
  const [selected, setSelected] = useState(new Date());

  // Separate arrays for events of members (exluding user), user, and all
  const [memberEvents, setMemberEvents, addMemberEvent] = useArrayState(null); 
  const [userEvents, setUserEvents, addUserEvent] = useArrayState(null); 
  const [events, setEvents, addEvent] = useArrayState(null); 

  // Function to add events to corresponding arrays
  const populateEventArrays = () => {

    // Temporary storage arrays
    const tempEvents: any = [];
    const tempUserEvents: any = [];
    const tempMemberEvents: any = [];

    // Adding all group members events to corresponding arrays
    groupMembers.forEach((member: any) => {
      member.events?.forEach((event: SchedulerExistingEvent) => {
        console.log(event);
        event.from = new Date(event.from);
        event.to = new Date(event.to);
        tempEvents.push(event);
        console.log(`All Events: ${events}`);
        if (member.personid == userId) {
          tempUserEvents.push(event);
        } else {
          tempMemberEvents.push(event);
        }
      })
    });

    // Batch updating arrays
    setEvents(tempEvents);
    setUserEvents(tempUserEvents);
    setMemberEvents(tempMemberEvents);
  }

  // Loading group member data once on mount
  useEffect(() => {
    const getGroupMembers = async () => {
      const url = `../api/get-group-members?groupId=${groupId}`;
      const init = {
        method: "GET"
      };
      const result = await fetch(url, init);
      const members = await result.json();
      setGroupMembers(members);
    }
    getGroupMembers();
  }, []);

  // Populating event arrays when group members are updated
  useEffect(() => {
    console.log(`Group members: ${groupMembers}`);
    populateEventArrays();
  }, [groupMembers]);

  // Saving user events to DB
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