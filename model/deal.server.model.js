'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Deal Schema
 */
var DealSchema = new Schema({
	dealNumber: {
	    type: String,
	    default: '',
	    trim: true
	},
	codeName: {
	    type: String,
	    default: '',
	    trim: true
	}
});

var Deal = mongoose.model('deal', DealSchema);
module.exports = Deal;




