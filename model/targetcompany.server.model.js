'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Deal Schema
 */
var TargetCompanySchema = new Schema({
	companyLogo: {
	    type: String,
	    default: '',
	    trim: true
	},
	companyName: {
	    type: String,
	    default: '',
	    trim: true
	}
});

var TargetCompany = mongoose.model('targetcompany', TargetCompanySchema);
module.exports = TargetCompany;


