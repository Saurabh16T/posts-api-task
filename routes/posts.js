const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Add a new post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
*       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My awesome post"
 *               description:
 *                 type: string
 *                 example: "This is the description of the post"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tag1", "tag2"]
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request (e.g., missing title)
 */
router.post('/', postController.addPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts with optional filters, pagination, and sorting
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of posts per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by (e.g., createdAt, title)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order, ascending or descending
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter posts by tag
 *     responses:
 *       200:
 *         description: List of posts returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', postController.getPosts);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Search posts by keyword in title or description
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: keywords
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword(s) to search for in posts
 *     responses:
 *       200:
 *         description: Posts matching search keywords
 *       400:
 *         description: Bad request - missing or invalid keywords
 *       500:
 *         description: Internal server error
 */
router.get('/search', postController.searchPosts);

/**
 * @swagger
 * /posts/tags:
 *   get:
 *     summary: Filter posts by one or more tags
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: tags
 *         required: false
 *         schema:
 *           type: string
 *         description: Comma separated list of tag IDs to filter posts
 *     responses:
 *       200:
 *         description: Posts filtered by tags
 *       500:
 *         description: Internal server error
 */
router.get('/tags', postController.filterByTags);

module.exports = router;
