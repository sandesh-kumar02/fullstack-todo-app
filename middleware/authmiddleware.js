export const isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // user logged in → next controller
  }
  res.redirect("/login"); // not logged in → login page
};

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};
