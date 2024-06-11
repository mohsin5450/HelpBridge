const db = require('../Models/Model');
const errorHandler = require('../utils/errorHandler');
require('dotenv').config();



const organizationRegistration = async (req, res) => {
    const { id, organizationName: name, directorName: director, email, phone, address, mission, description, website } = req.body;
    const data = { id, name, director, email, phone, address, mission, description, website };
  
    db.register(data, (err, org) => {
      if (err) return errorHandler(res, err, 'Organization not registered');
      res.status(200).json({ success: 'Organization registered' });
    });
};

const ID = async (req, res) => {
    const { userid: id } = req.body;

    db.getId(id, (err, dbid) => {
      if (err) return errorHandler(res, err, 'ID not retrieved');
      res.status(200).send(dbid);
    });
};


module.exports = { organizationRegistration,ID};