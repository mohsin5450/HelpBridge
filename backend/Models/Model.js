var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webproject'
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

const executeQuery = (sql, params, callbackFunction) => {
    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return callbackFunction(err);
        }
        callbackFunction(null, result);
    });
};

const signup = (data, callbackFunction) => {
    const { username, email, password } = data;
    const sql = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
    executeQuery(sql, [username, email, password], callbackFunction);
};

const getEmails = (email, callbackFunction) => {
    const sql = 'SELECT email FROM signup WHERE email = ?';
    executeQuery(sql, [email], callbackFunction);
};

const login = (email, callbackFunction) => {
    const sql = 'SELECT * FROM signup WHERE email = ?';
    executeQuery(sql, [email], callbackFunction);
};

const register = (data, callbackFunction) => {
    const { id, name, director, email, phone, address, mission, description, website } = data;
    const sql = 'INSERT INTO organization VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    executeQuery(sql, [id, name, director, email, phone, address, mission, description, website], callbackFunction);
};

const getId = (userId, callbackFunction) => {
    const sql = 'SELECT * FROM organization WHERE id = ?';
    executeQuery(sql, [userId], callbackFunction);
};

const createPost = (data, callbackFunction) => {
    const sql = 'INSERT INTO post (id, title, picture, description, date, target_money, collected_money) VALUES (?, ?, ?, ?, ?, ?, ?)';
    executeQuery(sql, data, callbackFunction);
};

const getAllPosts = (callbackFunction) => {
    const sql = 'SELECT * FROM post';
    executeQuery(sql, [], callbackFunction);
};

const getPost = (id, callbackFunction) => {
    const sql = 'SELECT * FROM post WHERE id = ?';
    executeQuery(sql, [id], callbackFunction);
};

const deletePost = (postId, callbackFunction) => {
    const sql = 'DELETE FROM post WHERE post_id = ?';
    executeQuery(sql, [postId], callbackFunction);
};

const donate = (data, callbackFunction) => {
    const sql = 'UPDATE post SET collected_money = ? WHERE post_id = ?';
    executeQuery(sql, [data.money, data.id], callbackFunction);
};

module.exports = {
    signup,
    getEmails,
    login,
    register,
    getId,
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    donate
};
