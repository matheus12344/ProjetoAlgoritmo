import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import styles from "../program.module.css";
import { program } from "../program-data";
import { privacy } from "./privacy-data";

export const metadata: Metadata = {
  title: `${privacy.title} — ${program.identity.shortName}`,
  description: privacy.intro,
  alternates: {
    canonical: "/estresse-reatividade/privacidade",
  },
  // Página utilitária: útil para quem chega pelo link, sem valor de busca.
  robots: { index: false, follow: true },
};

export default function ProgramPrivacyPage() {
  return (
    <div className={styles.program} id="top">
      <main className={styles.legalPage}>
        <div className={`${styles.content} ${styles.legalInner}`}>
          <a className={styles.legalBack} href={privacy.backHref}>
            <ArrowLeft aria-hidden="true" />
            {privacy.backLabel}
          </a>

          <p className={styles.sectionKicker}>{privacy.subtitle}</p>
          <h1>{privacy.title}</h1>
          <p className={styles.legalUpdated}>
            {privacy.updatedLabel}: {privacy.updated}
          </p>
          <p className={styles.legalIntro}>{privacy.intro}</p>

          {privacy.sections.map((section) => (
            <section key={section.title} className={styles.legalSection}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {"list" in section && section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {"note" in section && section.note ? (
                <p className={styles.legalNote}>{section.note}</p>
              ) : null}
            </section>
          ))}

          <section className={styles.legalController}>
            <h2>{privacy.controller.title}</h2>
            <p>
              <strong>{privacy.controller.name}</strong>
              <br />
              {privacy.controller.role}
              <br />
              {privacy.controller.location}
              <br />
              <a href={`mailto:${privacy.controller.email}`}>
                {privacy.controller.email}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
