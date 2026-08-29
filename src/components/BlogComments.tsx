'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { User } from 'lucide-react'

interface BlogCommentsProps {
  postId: string
}

interface Comment {
  id: string
  name: string
  text: string
  createdAt: string
}

export default function BlogComments({ postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchComments();
  }, [postId]);

  async function fetchComments() {
    try {
      const response = await fetch(`/api/blogs/${postId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data.map((c: any) => ({
        id: c.id,
        name: c.author,
        text: c.content,
        createdAt: c.createdAt
      })));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim() || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: name.trim(),
          content: text.trim(),
        }),
      });

      if (!response.ok) throw new Error('Failed to add comment');
      const data = await response.json();
      setComments(prev => [{
        id: data.id,
        name: data.author,
        text: data.content,
        createdAt: data.createdAt
      }, ...prev]);
      setName('');
      setText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  }

  // Get only the 2 most recent comments
  const recentComments = comments.slice(0, 2);
  const totalComments = comments.length;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        Comentários <span className="text-sm text-muted-foreground">({totalComments} no total)</span>
      </h3>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <div className="flex gap-2">
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome"
            className="max-w-xs"
            disabled={loading}
          />
        </div>
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Deixe seu comentário..."
          rows={3}
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !name.trim() || !text.trim()}>
          {loading ? 'Enviando...' : 'Comentar'}
        </Button>
      </form>
      <div className="space-y-4">
        {comments.length === 0 && <div className="text-muted-foreground">Nenhum comentário ainda.</div>}
        {recentComments.map(c => (
          <div key={c.id} className="bg-card/60 rounded p-3 flex gap-3 items-start">
            <div className="flex-shrink-0">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-blue-700">{c.name}</div>
              <div className="text-gray-700 whitespace-pre-line">{c.text}</div>
              <div className="text-xs text-muted-foreground mt-1">{new Date(c.createdAt).toLocaleString('pt-BR')}</div>
            </div>
          </div>
        ))}
        
        {totalComments > 2 && (
          <div className="text-sm text-muted-foreground text-center pt-2">
            Mostrando os {recentComments.length} comentários mais recentes de {totalComments} no total
          </div>
        )}
      </div>
    </div>
  )
}
