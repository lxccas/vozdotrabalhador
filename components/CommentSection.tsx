"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string
  content: string
  createdAt: string
  user: {
    name: string
    image: string
  }
}

interface CommentSectionProps {
  complaintId: string
  initialComments: Comment[]
}

export function CommentSection({ complaintId, initialComments }: CommentSectionProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const response = await fetch(`/api/complaints/${complaintId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newComment }),
    })

    if (response.ok) {
      const comment = await response.json()
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comentários</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={comment.user.image} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{comment.user.name}</span>
            <span className="text-gray-500 text-sm ml-2">{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
      {session && (
        <form onSubmit={handleSubmitComment} className="mt-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
            className="mb-2"
          />
          <Button type="submit">Enviar Comentário</Button>
        </form>
      )}
    </div>
  )
}

