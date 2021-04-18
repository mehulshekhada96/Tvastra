function home(req, res) {
      res.render("index");
    }
    
    function signin(req, res) {
      res.render("signin");
    }
    function signup(req,res) {
        res.render("signup");
    }    
    
    module.exports = {
          home: home,
          signup: signup,
          signin: signin
        };