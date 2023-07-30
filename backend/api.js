const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");

const multer = require("multer");
const app = express();

const db = require("./Database");
const port = 4000;
app.use(cors({origin: 'http://localhost:5173'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.post("/SignUpForm", (req, res) => {
    
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.fullname;
  

  db.getemails(email, (err, data) => {
      if (err) {
          res.send(err);
      }
      else {
          if (data.length > 0) {
              res.status(400).json({ error: "Email Already Exists" });
          }
          else {
              const salt = bcrypt.genSaltSync(10);
              const hash = bcrypt.hashSync(password, salt);
              const userdata = { username: username, email: email, password: hash };
              db.signup(userdata, (err, data) => {
                  if (err) {
                      res.status(500).json({ error: "user not signup" });
                      return;
                  } else {
                      res.status(200).json({ success: "user signup" });
                      
                  }
              });
          }
      }
  });
});




app.post("/login", (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    
    db.login(email, (err, data) => {
        if (err) res.status(500).json({ error: "user not login" });
        else {
            // res.status(200).json({ success: data[0].password});
            if (data && data.length > 0) {
              if (bcrypt.compareSync(password, data[0].password)) {
                res.send(data);
            } else {
                res.status(401).json({ error: "email or password  incorrect" });
            }
             
            }
            else{
              res.status(401).json({ error: "account not exit" });
              
            }
        }
    });
});



app.post("/register", (req, res) => {
    console.log("csdffv");
   var id= req.body.id;
   var name = req.body.organizationName;
    var director=req.body.directorName;
   var email= req.body.email;
   var phone= req.body.phone;
    var address=req.body.address;
    var mission=req.body.mission;
    var description=req.body.description;
    var website=req.body.website;
//onsole.log("csdffv");
    const data = {id:id,name:name,director:director,email:email,phone:phone,address:address,mission:mission,description:description,website:website}
db.register(data,(err,org)=>{
    if(err) res.status(500).json({error:"org not register"});
    else{
        res.status(200).json({success:"org register"});
        }
        });
        
});
    

app.post("/getid",(req,res)=>{
    var id = req.body.userid;
    console.log(id);
    db.getid(id,(err,dbid)=>{
        if(err) res.status(500).json({error:"not get id "});
        else{
console.log("get data");
            res.status(200).send(dbid);
        }
    })
})
const storage =  multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/images');
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
      },
    });
  const upload = multer({storage:storage});
  app.post('/createpost', upload.single('image'), (req, res) => {
    console.log(req.file);
    const {id, title,picture, description, date, targetMoney, amountCollected } = req.body;
    let pic = '';
  if (req.file) {
    pic = req.file.filename;
  }
  console.log(id);
    //const sql = 'INSERT INTO posts (id,title,picture, description, date, target_money, collected_money) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [id,title,pic, description, date, targetMoney, amountCollected];
  db.createPost(values,(err,resdata)=>{
    if(err)
    res.status(500).json({error:"post not created"});
    else{
        res.status(200).send(resdata);
        }
  })

  });
  app.get('/getpost', (req, res) => {
    var orgid = req.query.orgid; // Use req.query to access the query parameter
    db.getpost(orgid, (err, resdata) => {
      if (err) {
        res.status(500).json({ error: "post not get" });
      } else {
        res.status(200).json(resdata);
      }
    });
  });
  app.get('/getposts', (req, res) => {
    
    
    // Use req.query to access the query parameter
    db.allPosts( (err, resdata) => {
      if (err) {
        res.status(500).json({ error: "post not get" });
      } else {
        res.status(200).json(resdata);
      }
    });
  });
  app.delete('/deletepost/:id', (req, res) => {
    const postId = req.params.id;
  db.deletepost(postId,(err,resdata)=>{
    if(err)
    res.status(500).json({error:"post not deleted"});
    else{
        res.status(200).json({ message: 'Post deleted successfully' });
    }
  })
    // Implement the delete logic here, using the postId
  
    // Send a success response
    
  });


  app.put('/donateMoney', (req, res) => {
    const id = req.body.id;
    const money = req.body.money;
    const data = { id: id, money: money };
    console.log(id);
    
    // Use req.query to access the query parameter
    db.donate(data, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update" });
      } else {
        res.status(200).json({ message: "Successfully updated" });
      }
    });
  });

  app.post('/sendmail', (req, res) => {
   
    // Use req.query to access the query parameterf
  // const otp= Math.floor(Math.random() * 98547) + 34523;
  var email = req.body.email;
  const otp=req.body.otp;
   let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: '',
      pass: ''
    },
    secure: true,
  })
  const mailData = {
    from: '"hello 👻" <hello@gmail.com>',
    to: email,
    subject: `Email confirmation mail`,
    html: `<div className="flex flex-row"> <>Your email verification code is ${otp}`
  
  }
  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })
  res.status(200);

  });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
