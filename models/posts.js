const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }] // reference of tags schema
}, { timestamps: true });

postSchema.index({ title: 'text'});

module.exports = mongoose.model('posts', postSchema);
