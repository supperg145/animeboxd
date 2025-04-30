const checkAuth = async (req, res) => {
    if (req.cookies.userToken) {
        res.json({ authenticated: true });
        console.log("User is authenticated.");
    } else {
        res.json({ authenticated: false });
        console.log("User is not authenticated.");
    }
}

module.exports = { checkAuth };