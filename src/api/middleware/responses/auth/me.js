export default async (req, res, next) => {
  const user = req.user;
  delete user.password;
  res.status(200).json({ user });
};
