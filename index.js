const dotenv = require(`dotenv`)
dotenv.config()
const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = mysql.createPool({
host: process.env.MYHOST,
user: process.env.USER,
password: process.env.PASSWORD,
database: process.env.DATABASE,

});

console.log(`--------------heyyy-----------${process.env.MYHOST}`);
console.log(`--------------heyyy-----------${process.env.USER}`);
console.log(`--------------heyyy-----------${process.env.PASSWORD}`);
const port_backend = process.env.PORTBACKEND
const port_frontend = process.env.PORTFRONTEND
 console.log(db)
 app.use(cors({credentials: true,
    origin: [`http://myapp.com`,`https://myapp.com`,'http://localhost:5000','http://localhost:5001','http://localhost'],
 methods: [`GET`, `PUT`, `POST`, `DELETE`, `OPTIONS`],}))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

// ---------------------------------------display details start--------------------------------------
app.get(`/api/display_details`, (req, res)=>{
    const sqlselect=`SELECT * FROM customer`;    
    db.query(sqlselect, (err, result)=>{
        res.send(result)
        console.log(err)
        console.log(result)
    });
});
 
// ---------------------------------------display details end--------------------------------------

// ---------------------------------------Add details start--------------------------------------
app.post(`/api/add_details`, (req, res)=>{
 
    const name = req.body.name
    const email = req.body.email
    const contact = req.body.contact
    const city = req.body.city
    const age = req.body.age
    const sqlinsert=`INSERT INTO customer (name, email, contact, city, age) VALUES (?, ?, ?, ?, ?)`;    
    db.query(sqlinsert, [name,email,contact,city,age], (err, result)=>{
        console.log(err);
        res.send(result)
    });
});
// ---------------------------------------Add details end--------------------------------------

// ---------------------------------------Update details start--------------------------------------
app.post(`/api/select_one`,(req,res)=>{
    const user_id=req.body.user_id
    const sqlselect=`SELECT * FROM customer WHERE id=?`;    
    db.query(sqlselect, user_id, (err, result)=>{
        res.send(result)
        console.log(user_id)
        console.log(err) 
        console.log(result)
    });
});

app.put(`/api/update_one`,(req,res)=>{
    const user_id=req.body.uid
    const name = req.body.name
    const email = req.body.email
    const contact = req.body.contact
    const city = req.body.city
    const age = req.body.age
    const sqlinsert=`UPDATE customer SET name=?, email=?, contact=?, city=?, age=? WHERE id=?`;    
    db.query(sqlinsert, [name, email, contact, city, age, user_id], (err, result)=>{
        console.log(err);
        res.send(result)

    });
});
// ---------------------------------------Update details end--------------------------------------

// ---------------------------------------Delete details start--------------------------------------

// app.post(`/api/delete_one`,(req,res)=>{
//     const duser_id=req.body.duser_id
    // const sqlselect=`DELETE FROM customer WHERE id=?`;    
    // db.query(sqlselect, duser_id, (err, result)=>{
    //     res.send(result)
    //     console.log(duser_id)
    //     console.log(err) 
    //     console.log(result)
    // });
// });


app.post(`/delete`, (req, res) => {
    // const user_id=req.body.uid
    let sql = req.body.idd;
    const sqlselect=`DELETE FROM customer WHERE id=`+req.body.idd;    
    db.query(sqlselect, (err, result)=>{
        res.send(result)
        // console.log(duser_id)
        console.log(err) 
        console.log(result)
    });
  });


// ---------------------------------------Delete details end--------------------------------------
app.get(`/`, (req, res) => {
res.redirect(`http://localhost:${port_frontend}/`);
});

app.get(`/edit`, (req, res) => {
    res.redirect(`http://localhost:${port_frontend}/edit`);
});
app.get(`/display`, (req, res) => {
    res.redirect(`http://localhost:${port_frontend}/display`);
});
 
app.listen(port_backend, () => {
console.log(`running on port ${port_backend}`);
});
