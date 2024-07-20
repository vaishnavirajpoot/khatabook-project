const hisaabModel = require("../models/hisaab-model");
const userModel = require("../models/user-model");


module.exports.createHisaabControllers = function(req,res){
    res.render("create");
}


module.exports.postcreateHisaabControllers = async function(req,res){
    let {title,description,shareable,editpermissions,passcode,encrypted} = req.body;

      
    if(!title || !description ){
        
        return res.redirect("/hisaab/create");
    }

    shareable = shareable === 'on' ? true : false;
    editpermissions = editpermissions === 'on' ? true : false;
    encrypted = encrypted === 'on' ? true : false;

    if(encrypted){
        if(!passcode){
            
            return res.redirect("/hisaab/create");
            
        }
    }
    
    let hisaab = await hisaabModel.create({
        description,
        title,
        editpermissions,
        shareable,
        encrypted,
        passcode,
        user:req.user._id
    });

    req.user.hisaab.push(hisaab._id);
    await req.user.save();
    res.redirect("/profile");
    
}



module.exports.hisaabpageControllers = async function (req, res) {
    const id = req.params.id;
    let hisaab = await hisaabModel.findOne({_id:id});

    if (!hisaab) {
        return res.status(404).send("Hisaab not found");
    }
    
    // Proceed with your logic after ensuring hisaab exists
    if(hisaab.encrypted){
        return res.render("passcode",{isLoggedIn:true,id});
    }
    else{
        return res.render("hisaab",{hisaab});
    }
    
}

module.exports.readVerifyHisaabControllers =async function(req, res){
const id = req.params.id;

const hisaab = await hisaabModel.findOne({_id:id});

if(!hisaab){
    return res.redirect("/profile");
}

if(hisaab.passcode !== req.body.passcode){
    return res.redirect("/profile");
}


    return res.render("hisaab",{isloggedin:true,hisaab});
}


module.exports.deleteHisaabControllers = async function(req, res){
    const id = req.params.id;
    let hisaab = await hisaabModel.findByIdAndDelete(id);
    if (!hisaab) {
        return res.status(404).send("Hisaab not found");
    
}

return res.redirect("/profile");
}

module.exports.editHisaabControllers = async function(req, res){
    const id = req.params.id;

    let hisaab  = await hisaabModel.findOne({_id:id});

    if(!hisaab){
        return res.send("no hisaab is found");
    }

    return res.render("edit",{hisaab});
}


module.exports.editPostHisaabControllers = async function(req, res){
    const id  = req.params.id;
    let hisaab = await hisaabModel.findOne({_id:id});

    if(!hisaab){
        return res.send("no hisaab is found");

    }

    hisaab.title = req.body.title;
    hisaab.description = req.body.description;
    hisaab.editPermissions = req.body.editPermissions === 'on'? true : false;
    hisaab.shareable = req.body.shareable === 'on'? true : false;
    hisaab.encrypted = req.body.encrypted === 'on'? true : false;
    hisaab.passcode = req.body.passcode;


    await hisaab.save();

    res.redirect("/profile")
}














