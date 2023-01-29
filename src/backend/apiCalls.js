import httpService from "./httpService";
const auth = "/auth";
const user = "/user";
const oneToOne = "/one-to-one-chat";

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

export {
  signInEndpoint,
  loginInEndpoint,
  getUserFriendsEndpoint,
  searchFriendsEndpoint,
  addFriendsEndpoint,
  getCompleteChatEndpoint,
  sendOneToOneMessageEndpoint,
};
