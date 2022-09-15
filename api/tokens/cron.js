"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
          const { authorization } = req.headers;
    
          if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
            res.status(200).json({ success: true });
          } else {
            res.status(401).json({ success: false });
          }
        } catch (err) {
          res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    }
}