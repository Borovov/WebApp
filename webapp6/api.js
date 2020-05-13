const express = require("express");
var fs = require("fs");
const router = express.Router();
const Beast = require("./beast");

// Тело запроса
let jsonbody = null;

router.get("", (req, res) => {
    var page = fs.readFileSync("Form.html");
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(page);
    res.end();
})


router.get("/beast", (req, res)=>{
    console.log(jsonbody);
    res.send(jsonbody);
    // res.send({method: "GET"});
});

router.post("/beast", (req, res)=>{
    console.log("POST is reached");

    console.log(req.body);
    var name = req.body.name;
    var food = req.body.food;
    var bclass = req.body.class;
    var id = req.body.id;
    var number = req.body.number

    let finderror = null;

    if (food == "") {
        food = "herbivorous";
    }
    if (bclass == ""){
        bclass = "mammal";
    }
    if (id == ""){
        id = "1";
    }

    Beast.findOne({name: name, number: number})
    .then(beast => {
        if (beast != null)
        {
            Beast.findOne({food: food, class: bclass})
            .then(beast => {
                if(beast != null)
                {
                    Beast.findOne({id: id})
                    .then(beast => {
                        if(beast != null)
                        {
                            jsonbody = beast;
                            res.redirect("./beast");
                        }
                        else
                        {
                            finderror = {error: "ID Error", name: name, number: number };
                            res.send(finderror);
                        }
                    });
                }
                else
                {
                    finderror = {error: "Food or class error", name: name, number: number };
                    res.send(finderror);
                }
            });
        }
        else
        {
            finderror = {error: "Name Error", name: name, number: number };
            res.send(finderror);
        }
    });

});

module.exports = router;