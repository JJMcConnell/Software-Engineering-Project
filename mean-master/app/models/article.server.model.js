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
    date: {
        type: Date,
        default: Date.now,
        required: 'Must be a valid date'
    },
    time_period: {
        type: String,
        default: '',
        trim: true,
        required: 'Must be specified to a period on the UF schedule'
    }
});

mongoose.model('Event', EventSchema);
mongoose.model('Article', ArticleSchema);