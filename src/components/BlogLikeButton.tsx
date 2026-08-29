'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

interface BlogLikeButtonProps {
  postId: string
}

export default function BlogLikeButton({ postId }: BlogLikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // Load the initial like state from the post data
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/blogs/${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        setLikes(data.likes || 0);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();
  }, [postId]);

  async function handleLike() {
    if (liked) return;
    try {
      const response = await fetch(`/api/blogs/${postId}/like`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to like post');
      const data = await response.json();
      setLikes(data.likes);
      setLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }

  return (
    <Button
      onClick={handleLike}
      disabled={liked}
      variant={liked ? 'secondary' : 'outline'}
      className="flex items-center gap-2 text-base px-4 py-2 rounded-full border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors"
      aria-label="Curtir postagem"
    >
      <Heart className={liked ? 'fill-red-500 text-red-500' : 'text-blue-600'} />
      <span>{likes}</span>
      <span>{liked ? 'Curtido' : 'Curtir'}</span>
    </Button>
  )
}
