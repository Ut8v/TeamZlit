const { response } = require('express');
const {prisma, Prisma} = require('../database/index');

class PostIndexService {
    static async getPosts() {
        try {
            const posts = await prisma.createPost.findMany();

            return {
                success: true,
                data: posts
            };
        } catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async getPostById(postId) {
        try {
            const post = await prisma.createPost.findUnique({
                where: { id: Number(postId) }
            });

            if (!post) {
                return {
                    success: false,
                    error: "Post not found"
                };
            }

            return {
                success: true,
                data: post
            };
        } catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async deletePost(postId) {
        try {
            const post = await prisma.createPost.delete({
                where: { id: Number(postId) }
            });

            return {
                success: true,
                data: post
            };
        } catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }    
}

module.exports = PostIndexService;

