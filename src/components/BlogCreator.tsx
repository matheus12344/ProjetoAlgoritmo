"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PenLine, Eraser, Send, Info, HelpCircle } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { Card } from "@/components/ui/card";

export default function BlogCreator({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [publishAt, setPublishAt] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const formFields = [
    {
      label: "Título",
      value: title,
      onChange: setTitle,
      placeholder: "Digite um título envolvente para sua postagem",
      required: true,
      type: "input"
    },
    {
      label: "Resumo",
      value: excerpt,
      onChange: setExcerpt,
      placeholder: "Um breve resumo para atrair os leitores (opcional)",
      required: false,
      type: "input"
    },
    {
      label: "Conteúdo",
      value: content,
      onChange: setContent,
      placeholder: "Desenvolva seu conteúdo aqui. Use a barra de ferramentas para formatação.",
      required: true,
      type: "richtext"
    },
    {
      label: "Autor",
      value: author,
      onChange: setAuthor,
      placeholder: "Seu nome ou pseudônimo (opcional)",
      required: false,
      type: "input"
    }
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({ 
        title: "Campos obrigatórios", 
        description: "Por favor, preencha o título e o conteúdo da postagem.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, author, publishAt }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast({ 
          title: "Erro ao salvar", 
          description: err?.error || "Não foi possível salvar a postagem.",
          variant: "destructive"
        });
      } else {
        const created = await res.json();
        const now = Date.now();
        const scheduled = publishAt ? Date.parse(publishAt) > now : false;
        toast({ 
          title: scheduled ? "Agendado!" : "Sucesso!", 
          description: scheduled ? "Sua postagem foi agendada." : "Sua postagem foi publicada com sucesso.",
          variant: "default"
        });
        setTitle("");
        setExcerpt("");
        setContent("");
        setAuthor("");
        setPublishAt(undefined);
        onCreated?.();
      }
    } catch (err) {
      toast({ 
        title: "Erro de conexão", 
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  }

  function handleClear() {
    setTitle("");
    setExcerpt("");
    setContent("");
    setAuthor("");
    setPublishAt(undefined);
    toast({ 
      title: "Formulário limpo", 
      description: "Todos os campos foram resetados.",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div 
        className="grid gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {formFields.map((field, index) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <label className="block mb-2">
              <span className="font-medium text-gray-900">{field.label}</span>
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === "richtext" ? (
              <>
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder={field.placeholder}
                  disabled={saving}
                />
                <div className="mt-2 flex items-start gap-2 text-sm text-blue-600">
                  <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    Use os controles acima para formatar seu texto. Você pode adicionar títulos,
                    listas, links, imagens e muito mais para criar um conteúdo mais rico e
                    estruturado.
                  </p>
                </div>
              </>
            ) : field.type === "textarea" ? (
              <Textarea
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="min-h-[200px] bg-white/70"
                disabled={saving}
              />
            ) : (
              <Input
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="bg-white/70"
                disabled={saving}
              />
            )}
          </motion.div>
        ))}

        {/* Publish At (schedule) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block mb-2">
            <span className="font-medium text-gray-900">Agendar publicação</span>
            <span className="text-sm text-gray-500 ml-2">(opcional)</span>
          </label>
          <input
            type="datetime-local"
            value={publishAt || ""}
            onChange={(e) => setPublishAt(e.target.value || undefined)}
            className="w-full px-4 py-2 bg-white/70 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={saving}
          />
          <p className="text-xs text-slate-500 mt-2">Escolha a data e hora local para quando a postagem deve entrar no ar.</p>
        </motion.div>
      </motion.div>

      <Card className="p-4 border-blue-100 bg-blue-50/50">
        <div className="flex gap-2 text-sm text-blue-700">
          <Info className="w-5 h-5 flex-shrink-0" />
          <p>
            Dica: Escreva um conteúdo envolvente e informativo. Use parágrafos para melhor organização.
            O sistema identificará automaticamente a categoria e emoji mais adequados para sua postagem.
          </p>
        </div>
      </Card>

      <motion.div 
        className="flex flex-wrap items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]"
        >
          {saving ? (
            <>
              <PenLine className="w-4 h-4 mr-2 animate-pulse" />
              Salvando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Publicar
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={saving}
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <Eraser className="w-4 h-4 mr-2" />
          Limpar
        </Button>
      </motion.div>
    </form>
  );
}
