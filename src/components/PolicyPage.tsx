import Link from "next/link";

import { ConsentPreferencesButton } from "@/components/ConsentPreferencesButton";

type PolicyPageProps = {
  title: string;
  summary: string;
  children: React.ReactNode;
};

export function PolicyPage({ title, summary, children }: PolicyPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:py-16">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <Link
          className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline dark:text-blue-300"
          href="/terapia-guarulhos"
        >
          ← Voltar para o site
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
          {summary}
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Última atualização: 30 de agosto de 2026.
        </p>

        <div className="prose prose-slate mt-10 max-w-none space-y-8 dark:prose-invert">
          {children}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-700">
          <Link className="text-blue-700 hover:underline dark:text-blue-300" href="/privacidade">
            Política de Privacidade
          </Link>
          <Link className="text-blue-700 hover:underline dark:text-blue-300" href="/cookies">
            Política de Cookies
          </Link>
          <ConsentPreferencesButton className="text-blue-700 hover:underline dark:text-blue-300" />
        </div>
      </article>
    </main>
  );
}
