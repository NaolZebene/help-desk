const Gallary = require('../model/Gallary')
const Event = require("../model/Events")
const sendEmail = require("../util/sendEmail")
const Background = require("../model/Background")
const wrapAsync = require("../util/wrapAsync");
const fs = require("fs");
const path = require("path");

module.exports.createGallary = wrapAsync(async function(req,res){
    if(!req.files.length){
        return res.json({
            msg:"Image is Required"

        })
    }
    const files = req.files
  const paths =[]
    files.map((file)=>{
        let newGallery = {path:file.path}
        paths.push(newGallery)
    })
    await Gallary.insertMany(paths)
    return res.json({
        msg:"Gallary Posted"
    }).status(200)
})

module.exports.Getgallary = wrapAsync(async function(req,res){
    const gallaryImages = await Gallary.find()
    return res.json({
        msg:gallaryImages
    })
})

module.exports.deletGallary = wrapAsync(async function(req,res){
    const {id} = req.params;
    console.log(id)
    const imageExists = await Gallary.findById(id);
    if(!imageExists){
        return res.json({
            msg:"No Such Image"
        }).status(200)
    }
    await Gallary.findByIdAndDelete(id)
    return res.json({
        msg:"Image Deleted Successfully"
    })
})

module.exports.ContactUs = wrapAsync(async function(req,res){
    const data = req.body
    if (!(data.email && data.message && data.phone)) {
        return res.json({
          msg: "All input is required",
        });
      }

    message = `
    from:${data.email}\n
    \n
    ${data.message}\n
    \n
    Contact : ${data.phone}    
    `
    await sendEmail(`${'naolzebene1@gmail.com'}`,"Contact",message); //there will be one open email for the website
    res,json({
        msg:"Email Sent Successfully"
    })
})

module.exports.EventPost = async function(req,res){
    const data = req.body;
    console.log(data)

    if (!(data.title && data.description && data.date)) {
      return res.json({
        msg: "All input is required",
      });
    }
  
    if (!req.file) {
      return res
        .json({
          msg: "Image is Required",
        })
        .status(401);
    }
    const event = req.file.path;
   const new_data = {
      title: data.title,
      description: data.description,
      event: event,
      date: data.date,
    };
    console.log(new_data);
    const new_event = new Event(new_data);
    await new_event.save();
    
    return res
      .json({
        msg: "Event Posted Successfully",
      })
      .status(200);
}

module.exports.EditEvent = wrapAsync(async function(req,res){
    const { id } = req.params;
  const data = req.body;
 
if (!(data.title && data.description && data.date)) {
    return res.json({
      msg: "All input is required",
    });
  }
  let event = data.event

  if (req.file) {
    event = req.file.path;
  }
  if (!event) {
    return res.json({
      msg: "Image is Required",
    });
  }

  const edited = await Event.findById(id);
  if (!edited) {
    return res
      .json({
        msg: "No Such Id",
      })
      .status(401);
  }

  if (event !== edited.event) {
    clearImage(edited.event);
  }
 
 const new_data = {
    title: data.title,
    description: data.description,
    event: event,
    date: data.date,
  };

  await Event.findByIdAndUpdate(id, new_data);

  return res
    .json({
      msg: "Event Edited Successfully",
    })
    .status(200);

})

module.exports.getEvents = wrapAsync(async function(req,res){
    const events = await Event.find()
    return res.json({
        msg:events
    }).status(200)
})

module.exports.getOneEvent = wrapAsync(async function(req,res){
    const {id} = req.params; 
    const oneEvent = await Event.findById(id)
    if(!oneEvent){
        return res.json({
            msg:"No such Event"
        })
    }
    return res.json({
        msg:oneEvent
    }).status(200)
})
module.exports.deleteEvent = wrapAsync(async function(req,res){
    const {id} = req.params; 
    const deleted = await Event.findByIdAndDelete(id)
    if(!deleted){
        return res.json({
            msg:"No such id"
        }).status(200)
    }
    return res.json({
        msg:"Event Deleted Successfully"
    })
})


module.exports.CreateBackground = wrapAsync(async function(req,res){
    if(!req.file){
        return res.json({
            msg:"Image is required"
        }).status(200)
    }
    const image = req.file.path
    const background = await Background.find()

    if(background.length){
        await Background.deleteMany()
        const new_background = new Background({path:image})
        await new_background.save();
        return res.json({
            msg:"Background Changed Successfully"
        })
    }
    const new_background = new Background({path:image})
    await new_background.save();
    return res.json({
        msg:"Background Posted Successfully"
    })

})
module.exports.getBackGround = wrapAsync(async function(req,res){
    const data = await Background.findOne()
    return res.json({
        msg:data
    }).status(200)
})

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
  };