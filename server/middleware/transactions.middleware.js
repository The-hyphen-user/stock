const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

exports.WatchlistAuth = (req, res, next) => {
    next();
}
