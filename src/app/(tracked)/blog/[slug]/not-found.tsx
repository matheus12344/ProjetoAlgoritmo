import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Post não encontrado</h1>
          <p className="text-gray-600">
            Desculpe, o post que você está procurando não existe ou foi removido.
          </p>
        </div>

        <div className="text-8xl animate-bounce">
          😅
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">Voltar ao início</Link>
          </Button>
          <Button asChild>
            <Link href="/#blog">Ver outros posts</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}