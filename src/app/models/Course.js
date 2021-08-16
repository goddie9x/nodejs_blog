const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Course = new Schema({
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    videoYtId: { type: String, maxLength: 400, required: true },
    level: { type: String, maxLength: 155 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
}, { timestamps: true });

//add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);