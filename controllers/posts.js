const model = require('../models/index');
const { sendSuccess, sendError } = require('../services/common');
const { STATUS_CODES, MESSAGES: MSG } = require('../services/constants');
const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId

/**
 * @desc Add a new post
 * @body { title, description, tags, imageUrl }
 */
exports.addPost = async (req, res) => {
  try {
    let body = req.body;

    // req body validation
    if(!body || !body.title) throw new Error(MSG.BODY_IS_MISSING);

    let post = await model.posts.create(body);

    return sendSuccess(res, post, STATUS_CODES.CREATED );
  } catch (err) {
    return sendError(res, err.message, STATUS_CODES.BAD_REQUEST);
  }
};

/**
 * @desc Get all posts with filter, sort, pagination
 * @query page, limit, sortBy, order, tag, keyword
 */
exports.getPosts = async (req, res) => {
  try {
    let { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', tag } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const sortOrder = order === 'asc' ? 1 : -1;

    const query = {};

    if (tag) {
      query.tags = tag;
    }

    const posts = await model.posts.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('tags');

    return sendSuccess(res, posts, STATUS_CODES.SUCCESS );
  } catch (err) {
    return sendError(res, err.message);
  }
};

/**
 * @desc Search posts by keyword in title or description
 * @query keyword
 */
exports.searchPosts = async (req, res) => {
  try {
    const { keywords } = req.query;

    if (!keywords) {
      throw new Error(MSG.KEYWORD_CANNOT_BE_EMPTY)
    }

    const posts = await model.posts.find({
      $or: [
        { title: { $regex: keywords, $options: 'i' } },
        { desc: { $regex: keywords, $options: 'i' } }
      ]
    }).populate('tags');

   return sendSuccess(res, posts, STATUS_CODES.SUCCESS );
  } catch (err) {
    return sendError(res, err.message);
  }
};

/**
 * @desc Filter posts by tag(s)
 * @query tags (comma-separated)
 */
exports.filterByTags = async (req, res) => {
  try {
    let tagIds = req.query.tags?.split(',') || [];
    tagIds = tagIds.map(id=> ObjectId(id));
    const posts = await model.posts.find({ tags: { $in: tagIds } }).populate('tags');

    return sendSuccess(res, posts, STATUS_CODES.SUCCESS );
  } catch (err) {
    return sendError(res, err.message);
  }
};
