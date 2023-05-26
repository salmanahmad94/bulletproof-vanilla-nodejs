import { hash } from "bcryptjs";

export default (password) => {
  return hash(password, 10);
};
