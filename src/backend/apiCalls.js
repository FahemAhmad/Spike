import httpService from "./httpService";
const auth = "/auth";
const user = "/user";
const oneToOne = "/one-to-one-chat";
const notes = "/notes";

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
};
