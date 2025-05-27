const hisaabModel = require("../models/hisaab-model");

const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.landingPageControllers = function (req, res) {
    res.render("index",{loggedin:false,error: req.flash("error")});
}

module.exports.registerControllers = function (req, res) {
    res.render("register",{loggedin:false,error: req.flash("error")});
}



module.exports.profileControllers = async function(req, res) {
    let byDate = Number(req.query.byDate);
    let { startDate, endDate } = req.query; // Corrected destructuring syntax

    byDate = byDate ? byDate : -1;
    startDate = startDate ? startDate : new Date("1270-01-02"); // Corrected variable name
    endDate = endDate ? endDate : new Date();

    let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "hisaab",
        match: { createdAt: { $gte: startDate, $lte: endDate } },
        options: { sort: { createdAt: byDate } },
    });


    res.render("profile", { user });
}



module.exports.postRegisterControllers = async function (req, res) {
    let { email, password, fullname, username } = req.body;
    try {

        let user = await userModel.findOne({ email });

        if (user) return res.render("you have already an account.");

        let salt = await bcrypt.genSalt(10);

        let hash = await bcrypt.hash(password, salt);


        user = await userModel.create({
            email,
            password: hash,
            fullname,
            username,
        })
    
    if (!fullname || !username || !password || !email ) {
        req.flash("error", "all fields are required");
        return res.redirect("/register");
    }
    if(fullname.length < 3) {
        req.flash("error", "name must be at least 3 characters long");
        return res.redirect("/register");
    } 
    if(username.length < 3){
        req.flash("error", " username must be at least 3 characters long");
        return res.redirect("/register");
    }
    console.log(password.length);
    if(password.length < 4){
        req.flash("error", "password must be at least 4 characters long");
        return res.redirect("/register");
    }

    

        let token = jwt.sign({ id: user._id, email }, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/");
    } catch (err) {
        res.send(err.message);
    }

}


module.exports.loginControllers = async function (req, res) {

    let { password, email } = req.body;
    const user = await userModel.findOne({ email });

    if (!email || !password) {
        req.flash("error", "all fields are required")
        return res.redirect("/");
    }


  
  
    if (!user) {
        req.flash("error", "you have to registered first");

        return res.redirect("/");

    }

    let result = await bcrypt.compare(password, user.password);
 
    if(result){

        let token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
        // console.log(token);
        res.cookie("token", token);

        return res.redirect("/profile",);
    }
    else{
        req.flash("error", "Email or password is incorrect");
        res.redirect("/");
    }

};


module.exports.logoutControllers = async function (req, res) {
    res.cookie("token", "");
    return res.redirect("/");
};


