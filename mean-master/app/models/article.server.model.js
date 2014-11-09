'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({}); // temporary
var EventSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        required: 'Must have a title'
    },
    description: {
        type: String,
        default: ''
        // not required
    },
    sponsor: {
        type: String,
        default: '',
        required: 'Must have a sponsor'
    },
    contactEmail: {
        type: String,
        default: '',
        trim: true,
        required: 'Must have a contact Email'
    },
    contactPhone: {
        type: String,
        default: ''
        // not required
    },
    room: {
        type: String,
        default: '',
        trim: true,
        required: 'Must be a valid number'
    },
    month: {
        type: String,
        required: 'Must be a valid month'
    },
    day: {
        type: String,
        required: 'Must be a valid day'
    },
    year: {
        type: String,
        required: 'Must be a valid year'
    },
    period: {
        type: Number,
        default: 1,
        trim: true,
        required: 'Must be specified to a period on the UF schedule'
    },
    viewed: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: false
    }
});

var AdminSettings = new Schema({
    startDay: {
        type: String,
        required: 'Must be a valid day'
    },
    startMonth: {
        type: String,
        required: 'Must be a valid day'
    },
    startYear: {
        type: String,
        required: 'Must be a valid day'
    },
    endDay: {
        type: String,
        required: 'Must be a valid day'
    },
    endMonth: {
        type: String,
        required: 'Must be a valid day'
    },
    endYear: {
        type: String,
        required: 'Must be a valid day'
    }
});

mongoose.model('Event', EventSchema);
mongoose.model('Article', ArticleSchema);
mongoose.model('Admin Setting', AdminSettings);