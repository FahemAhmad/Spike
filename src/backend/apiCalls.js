import httpService from "./httpService";
const auth = "/auth";
const user = "/user";
const oneToOne = "/one-to-one-chat";
const notes = "/notes";
const tasks = "/tasks";
const events = "/events";

// Auth services
const signInEndpoint = (body) => httpService.post(`${auth}/signup`, body);
const loginInEndpoint = (body) => httpService.post(`${auth}/login`, body);

// User
const getUserFriendsEndpoint = () => httpService.get(`${user}/friends`);
const searchFriendsEndpoint = (input) =>
  httpService.get(`${user}/search?input=${input}`);
const addFriendsEndpoint = (body) => httpService.put(`${user}/addfriend`, body);

//get one to one chats of the user
const getCompleteChatEndpoint = (id) => httpService.get(`${oneToOne}/${id}`);
const sendOneToOneMessageEndpoint = (id, body) =>
  httpService.post(`${oneToOne}/${id}/message`, body);

// Notes
const getMyNotesEndpoint = () => httpService.get(`${notes}/mytasks`);
const addNoteEndpoint = (body) => httpService.post(`${notes}`, body);
const deleteNoteEndpoint = (id) => httpService.delete(`${notes}/${id}`);
const updateNoteEndpoint = (id, body) =>
  httpService.patch(`${notes}/${id}`, body);
const getSharedNotesEndpoint = (email) =>
  httpService.get(`${notes}/shared/${email}`);

//Tasks
const getMyTasksEndpoint = () => httpService.get(`${tasks}/mytasks`);
const addTaskEndpoint = (body) => httpService.post(`${tasks}`, body);
const deleteTaskEndpoint = (id) => httpService.delete(`${tasks}/${id}`);
const updateTaskEndpoint = (id, body) =>
  httpService.patch(`${tasks}/${id}`, body);
const getSharedTasksEndpoint = (email) =>
  httpService.get(`${tasks}/shared/${email}`);

//Events
const getMyEventsEndpoint = () => httpService.get(`${events}/myevents`);
const addEventEndpoint = (body) => httpService.post(`${events}`, body);
const deleteEventEndpoint = (id) => httpService.delete(`${events}/${id}`);
const updateEventEndpoint = (id, body) =>
  httpService.patch(`${events}/${id}`, body);
const getSharedEventsEndpoint = (email) =>
  httpService.get(`${events}/shared/${email}`);

export {
  signInEndpoint,
  loginInEndpoint,
  getUserFriendsEndpoint,
  searchFriendsEndpoint,
  addFriendsEndpoint,
  getCompleteChatEndpoint,
  sendOneToOneMessageEndpoint,
  getMyNotesEndpoint,
  addNoteEndpoint,
  deleteNoteEndpoint,
  updateNoteEndpoint,
  getSharedNotesEndpoint,
  getMyTasksEndpoint,
  addTaskEndpoint,
  deleteTaskEndpoint,
  updateTaskEndpoint,
  getSharedTasksEndpoint,
  getMyEventsEndpoint,
  addEventEndpoint,
  deleteEventEndpoint,
  updateEventEndpoint,
  getSharedEventsEndpoint,
};
