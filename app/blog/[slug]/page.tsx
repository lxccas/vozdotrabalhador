import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"

async function getBlogPost(slug: string) {
  return await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        Por {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">{post.content}</div>
    </div>
  )
}

