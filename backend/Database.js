var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'webproject'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database.');
});

const signup = (data,callbackFuction)=>{
    const {username,email,password}= data;
    const sql = `INSERT INTO signup (username,email,password) VALUES (?,?,?)`;
connection.query(sql,[username,email,password],(err,result)=>{
    if(err) throw err;
    
  callbackFuction(null,result);
})
}

const getemails=  (email,callbackFuction)=>{
const sql = "SELECT email From signup WHERE email = ?";
connection.query(sql,[email],  (err,result)=>{
    if(err) throw err;
    callbackFuction(null,result);
})
}
const login =((email,callbackFuction)=>{
    const sql = `SELECT * FROM signup WHERE email = ?`;
    connection.query(sql,[email],(err,result)=>{
        if(err) throw err;
        callbackFuction(null,result);
    })
})

const register = ((data,callbackFuction)=>{
    const{id,name,director,email,phone,address,mission,description,website}=data;
    console.log("db"+name)
    const sql = `INSERT INTO organization VALUES (?,?,?,?,?,?,?,?,?)`; 
    connection.query(sql,[id,name,director,email,phone,address,mission,description,website],(err,result)=>{
        if(err) throw err;
        callbackFuction(null,result);
    })

})
const getid= ((userid,callbackfunction)=>{
    console.log("db"+" "+userid);
    const sql = "Select * from organization WHERE id=?";
    connection.query(sql,[userid],(err,result)=>{
        if(err) throw err;
        callbackfunction(null,result);
    })
})
const createPost =((data,callbackfunction)=>{
 
   const sql = `INSERT INTO post (id,title,picture,description,date,target_money,collected_money) VALUES (?,?,?,?,?,?,?)`;
   connection.query(sql,data,(err,result)=>{
    if(err) throw err;
    callbackfunction(null,result);
   })
})
const allPosts =((callbackFuction)=>{
    const sql = "SELECT * FROM post";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        callbackFuction(null,result);
        })
})
const getpost =((id,callbackFuction)=>{
    const sql = "SELECT * FROM post WHERE id=?";
    connection.query(sql,[id],(err,result)=>{
        if(err) throw err;
        callbackFuction(null,result);
        })
})
const deletepost = ((postid,callbackFuction)=>{
    const sql ="DELETE FROM post WHERE post_id=?";
    connection.query(sql,[postid],(err,result)=>{
        if(err) throw err;
        callbackFuction(null,result);
        })
})
const donate = ((data, callbackFunction) => {
    const sql = 'UPDATE post SET collected_money = ? WHERE post_id = ?';
    connection.query(sql, [data.money, data.id], (err, result) => {
      if (err) {
        console.error(err);
        callbackFunction(err);
      } else {
        callbackFunction(null, result);
      }
    });
  });
module.exports = {
    signup,
    getemails,
    login,
    register,
    getid,
    createPost,
    getpost,
    allPosts,
    deletepost,
    donate
  };