const fs = require("fs");
const path = require("path");
const Clients = require("../model/Clients");

module.exports.CreateClients = async function (req, res) {
  if (!req.file) {
    return res.json({
      msg: "Logo Required",
    });
  }
  const logo = req.file.path;
  const name = req.body.title;
  const new_data = {
    logo: logo,
    name: name,
  };
  const clients_data = new Clients(new_data);
  await clients_data.save();
  return res
    .json({
      msg: "Client Added Successfully",
    })
    .status(200);
};

module.exports.EditClients = async function (req, res) {
  const name = req.body.title;
  let logo = req.body.logo;

  if (req.file) {
    logo = req.file.path;
  }
  if (!logo) {
    return res.json({
      msg: "image Required",
    });
  }

  const { id } = req.params;

  const client = await Clients.findById(id);
  if (!client) {
    return res
      .json({
        msg: "No Such Client",
      })
      .status(403);
  }

  if (logo !== client.logo) {
    clearImage(client.logo);
  }

  const new_data = {
    logo: logo,
    name: name,
  };

  await Clients.findByIdAndUpdate(id, new_data);

  return res
    .json({
      msg: "Client Edited Successfully",
    })
    .status(200);
};

module.exports.getClients = async function (req, res) {
  const all_data = await Clients.find({ isDeleted: false });
  return res
    .json({
      msg: all_data,
    })
    .status(200);
};

module.exports.getClient = async function (req, res) {
  const { id } = req.params;
  const client = await Clients.findById(id);
  if (!client) {
    return res
      .json({
        msg: "No Such Client",
      })
      .status(403);
  }
  return res
    .json({
      msg: client,
    })
    .status(200);
};

module.exports.deleteClients = async function (req, res) {
  const { id } = req.params;
  const client = await Clients.findById(id);
  if (!client) {
    return res.json({
      msg: "No Such Client",
    });
  }
  client.isDeleted = true;
  await client.save()
  return res.json({
    msg: "Client Deleted Successfully",
  });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
