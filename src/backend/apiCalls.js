import httpService from "./httpService";
const auth = "/auth";

const signInEndpoint = (body) => httpService.post(`${auth}/signup`, body);

const loginInEndpoint = (body) => httpService.post(`${auth}/login`, body);

export { signInEndpoint, loginInEndpoint };
