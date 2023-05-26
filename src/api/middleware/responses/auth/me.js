export default async (req, res) => {
    const user = req.user;
    delete user.password;
    res.status(200).json({ user });
};
