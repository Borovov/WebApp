const express = require("express");
var fs = require("fs");
const router = express.Router();
const Beast = require("./beast");

let jsonbody = null;


router.get("/beast", (req, res)=>{
    console.log(jsonbody);
    res.send(jsonbody);
});

router.post("/find", (req, res)=>{
    console.log("POST is reached");
    console.log(req.body);
    var name = req.body.name;
    var value = req.body.value;

    if (value === '')
    {
        value = Math.floor(Math.random() * 9);
    }

    Beast.findOne({name: name, value: value})
        .then(beast => {      
            if (beast != null)
            {
                console.log("");
                console.log(beast);
                res.send({name: beast.name, value: beast.value, id: beast.ID, food: beast.food, class: beast.class});
            }
            else
            {
                imgerror = {error: "Image not found"};
                res.send(imgerror);
            }
        })
});

router.post("/beast", (req, res)=>{

    var name = req.body.name;
    var food = req.body.food
    var bclass = req.body.class;
    var ID = req.body.ID;
    var number = req.body.number

    let finderror = null;

    if (food == "") {
        food = "predator";
    }
    if (bclass == ""){
        bclass = "mammal";
    }
    if (ID == ""){
        finderror = {error: "ID Error", name: name, number: number };
        res.send(finderror);
    }

    Beast.findOne({name: name, number: number})
    .then(beast => {
        if (beast != null)
        {
            Beast.findOne({food: food})
            .then(beast => {
                if (beast != null)
                {
                    Beast.findOne({class: bclass})
                    .then(beast => {
                        if (beast != null)
                        {
                            Beast.findOne({ID: ID})
                            .then(beast => {
                                if (beast != null)
                                {
                                    jsonbody = beast;
                                    res.redirect("./beast");
                                }
                                else
                                {
                                    finderror = {error: "ID Error", name: name, number: number };
                                    res.send(finderror);
                                }
                            })
                        }
                        else
                        {
                            finderror = {error: "Class Error", name: name, number: number };
                            res.send(finderror);
                        }
                    })
                }
                else
                {
                    finderror = {error: "Food Error", name: name, number: number };
                    res.send(finderror);
                }
            })
        }
        else
        {
            finderror = {error: "Name Error", name: name, number: number };
            res.send(finderror);
        }
    });

});


module.exports = router;