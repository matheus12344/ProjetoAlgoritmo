"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCreator from "@/components/BlogCreator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PenLine, ArrowLeft, Trash2, RefreshCw, BookOpen, Download } from "lucide-react";
import { classifyPostEmoji } from "@/lib/post-emoji-classifier";
import { useToast } from "@/hooks/use-toast";

type Post = {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  createdAt: string;
  slug?: string;
  publishAt?: string;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  async function fetchPosts() {
    setLoading(true);
    try {
      // request all posts (including scheduled) for the admin interface
      const res = await fetch("/api/blogs?all=true");
      if (res.ok) {
        const data = await res.json();
        setPosts(data || []);
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar as postagens.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const res = await fetch('/api/blogs/export');
      if (!res.ok) throw new Error('Falha ao exportar');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'posts-export.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast({ title: 'Exportado', description: 'Arquivo de posts baixado com sucesso.' });
    } catch (err) {
      toast({ title: 'Erro', description: 'Não foi possível exportar os posts.', variant: 'destructive' });
    } finally {
      setExporting(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <motion.header 
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div 
              className="inline-flex items-center space-x-2 text-blue-600 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <PenLine className="w-5 h-5" />
              <span className="font-medium">Gerenciamento do Blog</span>
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900">Criar e Gerenciar Posts</h1>
            <p className="text-lg text-muted-foreground">
              Crie conteúdo envolvente para seu blog. Compartilhe conhecimento e experiências de forma profissional.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button asChild variant="outline" size="lg">
                <a href="/" className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao site
                </a>
              </Button>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="/blog" className="inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Ver blog
                </a>
              </Button>
            </div>
          </div>
        </motion.header>

        <section className="grid lg:grid-cols-[1fr,400px] gap-8">
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">Criar Nova Postagem</h2>
            <BlogCreator onCreated={fetchPosts} />
          </Card>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Posts Recentes</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="inline-flex items-center gap-2"
                  disabled={exporting}
                >
                  <Download className={`w-4 h-4 ${exporting ? 'animate-spin' : ''}`} />
                  {exporting ? 'Exportando...' : 'Exportar'}
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={fetchPosts}
                  className="inline-flex items-center gap-2"
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Carregando...' : 'Atualizar'}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {posts.length === 0 && (
                <Card className="p-8 text-center bg-blue-50/50">
                  <BookOpen className="w-12 h-12 text-blue-600/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">Nenhuma postagem encontrada.</p>
                  <p className="text-sm text-muted-foreground">Crie sua primeira postagem usando o formulário ao lado.</p>
                </Card>
              )}
              {posts.map((post) => {
                const { emoji } = classifyPostEmoji(post.title, post.content);
                return (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <Card className="p-4 border border-blue-100/50 hover:border-blue-200 transition-colors">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                          {emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {post.excerpt || post.content}
                          </p>
                          {post.publishAt && Date.parse(post.publishAt) > Date.now() && (
                            <div className="mt-2 inline-flex items-center gap-2 text-xs bg-yellow-50/80 text-yellow-800 px-2 py-1 rounded">
                              <span className="font-medium">Agendado</span>
                              <time dateTime={post.publishAt} className="text-xs text-yellow-700">
                                {new Date(post.publishAt).toLocaleString('pt-BR')}
                              </time>
                            </div>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{post.author || 'Anônimo'}</span>
                            <time dateTime={post.createdAt}>
                              {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                            </time>

                            <div className="ml-auto">
                              <button
                                title="Apagar postagem"
                                aria-label="Apagar postagem"
                                onClick={async () => {
                                  const ok = confirm('Deseja realmente apagar esta postagem? Esta ação não pode ser desfeita.');
                                  if (!ok) return;
                                  try {
                                    setDeletingId(post.id);
                                    const res = await fetch(`/api/blogs/${post.id}`, { method: 'DELETE' });
                                    if (!res.ok) throw new Error('Failed');
                                    // remove locally
                                    setPosts((cur) => cur.filter((p) => p.id !== post.id));
                                    toast({ title: 'Apagado', description: 'Postagem removida com sucesso.' });
                                  } catch (err) {
                                    toast({ title: 'Erro', description: 'Não foi possível apagar a postagem.', variant: 'destructive' });
                                  } finally {
                                    setDeletingId(null);
                                  }
                                }}
                                disabled={deletingId === post.id}
                                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 ${
                                  deletingId === post.id
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white/80 text-red-600 hover:bg-red-600 hover:text-white'
                                }`}
                              >
                                {deletingId === post.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
