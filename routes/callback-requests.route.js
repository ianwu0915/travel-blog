let CallBackRequest = require('../models/callback-requests.model').CallBackRequest;
let uniqid = require("uniqid");
let express = require("express");

// Create a new express router
let router = express.Router();

router.get("/", async (req, resp) => {
    resp.send( await CallBackRequest.find());
});

router.post("/", async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallBackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })

    await newRequest.save();
    resp.send("Accepted!");
});

router.delete("/:id", async (req, resp) => {
    await CallBackRequest.deleteOne({id: req.params.id});
    resp.send("Deleted");
}); 

module.exports = router;
