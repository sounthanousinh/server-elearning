let express = require('express');
let App = express();
let BodyPasser = require('body-parser');

App.use(BodyPasser.json());
App.use(BodyPasser.urlencoded({ extended: true }));

// port form server
// let port = process.env.port || 8080
let port = 8080;

App.get('/', (req, res) => {
    return res.send({ error: false, message: "Hello word", name: 'noum' })
})


// App.use('/users', require('./api/users'))
App.use('/users', require('./api/users'));

App.listen(port, () => { console.log("npm run dev is Port:" + port); })

module.exports = App;