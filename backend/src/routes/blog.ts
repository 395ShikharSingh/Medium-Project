import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@shikharsingh123/medium-common";

export const blogRouter= new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables: {
        userId: string;
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("Authorization") || "";

    try {
        const user = await verify(header, c.env.JWT_SECRET);
        console.log("Decoded user:", user);

        if (user && typeof user.id === "string") {
            c.set("userId", user.id);
        } else if (user && typeof user.id === "number") {
            c.set("userId", user.id.toString());
        } else {
            throw new Error("user.id must be a string");
        }

        await next();
    } catch (error) {
        console.error("Error in middleware:", error);
        c.status(403);
        return c.json({ error: "Unauthorized" });
    }
});


blogRouter.post("/post", async (c) => {
    const body = await c.req.json();
    const { success }= createBlogInput.safeParse(body);
	if(!success) {
		c.status(411);
		return c.json({
			message: "Input not correct"
		})
	}
    const authorId = c.get("userId"); // Guaranteed to be a string

    if (!authorId) {
        c.status(400);
        return c.json({ error: "Missing user ID" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId), // Convert to a number for Prisma
        },
    });

    return c.json({ id: post.id });
});


blogRouter.put("/p", async(c) => {
    const body = await c.req.json();
    const { success }= updateBlogInput.safeParse(body);
	if(!success) {
		c.status(411);
		return c.json({
			message: "Input not correct"
		})
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const Post= await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: Post.id,
        msg: "Updated"
    })
})

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const Post = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id:true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        Post
    });
})

blogRouter.get("/:id", async(c) => {
    const id =  c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
        const Post= await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title:true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            Post
        });
    } catch(e) {
        c.status(411);
        return c.json({
            msg: "Errror while fetching blog post"
        });
    }
    
})

