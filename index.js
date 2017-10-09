var express = require("express")
var bodyParser = require("body-parser")
var jwt    = require("jsonwebtoken")
var app = express()
app.use(bodyParser.json())
app.set("port", (process.env.PORT || 5000))
app.set("superSecret", "oauthServerLogin")

app.post("/login", function (req, res) {    
    console.log("cheking username and password " + new Date().toJSON())
    
    var login = req.body
    if (login.username == "admin" && login.password == "admin" ) {
        
        const payload = {
            admin: true
        }
        
        var token = jwt.sign(payload, app.get("superSecret"), {
            expiresIn: 3600 // expires in 1 hour
        })

        // return the information including token as JSON
        res.json({
            success: true,
            token: token
        })
    } 
    else {
        res.sendStatus(401)
    }
    
})

app.get("/login", function (req, res) {
    res.send("send a POST to /login with a body { \"username\": \"admin\", \"password\" : \"admin\" } ")
})

app.get("/user", function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers["x-access-token"]
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get("superSecret"), function(err, decoded) {      
        if (err) {
            return res.status(403).send({ 
                success: false, 
                message: "Failed to authenticate token." 
            })             
        } else {             
            res.json({
                success: true,
                message: "the token is valid"
            })
        }
      })
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: "No token provided." 
      })
  
    }
})

app.listen(app.get("port"), function() {
    console.log("Node app is running on port", app.get("port"))
})