import httpService from "./httpService";
const email = "emails";

// Emails
const getAllEmails = () => httpService.get(`/${email}`);

export default { getAllEmails };
