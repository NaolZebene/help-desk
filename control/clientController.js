const Clients = require('../model/Clients'); 

module.exports.CreateClients = async function(req,res){
const incoming = JSON.parse(req.body.str)[0];
if (!req.file){
    return res.json({
        msg:"File Required"
    })
}
const logo = req.file.filename;
const new_data = {
    logo:logo,
    name:incoming.name
}
const clients_data = new Clients(new_data)
await clients_data.save()
return res.json({
    msg:"Client Added Successfully"
}).status(200)
}



module.exports.EditClients = async function(req,res){
    const incoming = JSON.parse(req.body.str)[0];
    if (!req.file){
        return res.json({
            msg:"File Required"
        })
    }
    const {id} = req.params
    const logo = req.file.filename;
    const new_data = {
        logo:logo,
        name:incoming.name
    }
    await Clients.findByIdAndUpdate(id,new_data)
    return res.json({
        msg:"Client Edited Successfully"
    }).status(200)
}

module.exports.getClients = async function(req,res){
    const all_data = await Clients.find({isDeleted:false})
    return res.json({
        msg:all_data
    }).status(200)
}

module.exports.deleteClients = async function(req,res){
    const {id} = req.params; 
    const client = await Clients.findById(id); 
    if(!client){
        return res.json({
            msg:"No Such Client"
        })
    }
    client.isDeleted = true; 
    return res.json({
        msg:"Client Deleted Successfully"
    })
}