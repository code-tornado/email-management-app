import { APICore } from "./apiCore";

const api = new APICore();

function addEmails(emails: any) {
  return api.create('/', { emails });
}

function getEmails(count: number) {
  return api.get('/', { count });
}

export { addEmails, getEmails };
