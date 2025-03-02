const checkAuth = async (req, res) => {
    if (req.cookies.userToken) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
}

module.exports = { checkAuth };