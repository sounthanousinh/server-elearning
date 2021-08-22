let express = require("express");
let routers = express.Router();
let Bodyparser = require("body-parser");
let cors = require('cors');

routers.use(cors({ origin: true, credentials: true }))

routers.use(Bodyparser.json());
routers.use(Bodyparser.urlencoded({ extended: true }));

/** connDB to file database */
let connDB = require('../connection/connection')
connDB.connect();
/** end */

routers.get('/', cors(), (req, res) => {
    return res.send({ error: false, message: "Methos Get path User: http://192.168.100.4:8080/users", name: 'noum' })
})


/** search */
routers.get('/login/:name/:email', cors(), (req, res) => {
    let names = req.params.name;
    let emails = req.params.email;
    let Mysql = "SELECT * FROM users WHERE usr_name LIKE '%" + names + "%' OR usr_email LIKE '%" + emails + "%' "
    connDB.query(Mysql, (error, results, fields) => {
        if (error) throw error;
        let msg = "";
        if (results == undefined || results.length == 0) msg = "Data is empty"
        else msg = "json data successfully row: " + results.length
        return res.send({ status: false, resp: results, message: msg })

    })
})


/** login  **/
routers.post('/login', cors(), (req, res) => {
    let passwords = req.body.postpassword;
    let emails = req.body.postemail;
    let Mysql = "SELECT * FROM users WHERE usr_password='" + passwords + "' AND usr_email ='" + emails + "' "
    connDB.query(Mysql, (error, results, fields) => {
        if (error) throw error;
        let msg = "";
        if (results == undefined || results.length == 0) msg = "Data is empty"
        else msg = "successfully"
        return res.send({ status: false, resp: results, message: msg })

    })
    // if (!emails && !passwords) {
    //     return res.send({ error: true, message: "error post.." })
    // } else {
    //     return res.send({ error: false, message: "successfully" })
    // }
})




module.exports = routers;