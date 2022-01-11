export default (user) => {
  let { _id, username, password, email, lastLogin, createdAt, updatedAt } =
    user;

  return {
    id: _id ? _id : user.id,
    username,
    password,
    email,
    lastLogin,
    createdAt,
    updatedAt,
  };
};
