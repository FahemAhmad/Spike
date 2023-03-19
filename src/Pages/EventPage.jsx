import React from "react";
import CreateEventForm from "../Components/Events/CreateEvents";
import ViewEvents from "../Components/Events/ViewEvents";

function EventPage() {
  return (
    <>
      <CreateEventForm />
      <ViewEvents />
    </>
  );
}

export default EventPage;
