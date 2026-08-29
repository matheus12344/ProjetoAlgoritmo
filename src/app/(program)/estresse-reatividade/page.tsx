import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Circle,
  Clock3,
  Info,
  LifeBuoy,
  MessageCircle,
  MoveRight,
  Sparkles,
} from "lucide-react";
import { InterestForm } from "./_components/InterestForm";
import { ProcessDiagram } from "./_components/ProcessDiagram";
import { ProgramAccordion } from "./_components/ProgramAccordion";
import { ProgramHeader } from "./_components/ProgramHeader";
import { ProgramSection } from "./_components/ProgramSection";
import styles from "./program.module.css";
import { program, waitlistFormOpen, whatsappHref } from "./program-data";

export const metadata: Metadata = {
  title: program.identity.shortName,
  description: program.identity.title,
  alternates: {
    canonical: "/estresse-reatividade",
  },
  openGraph: {
    title: program.identity.shortName,
    description: program.identity.title,
    url: "/estresse-reatividade",
    locale: "pt_BR",
    type: "website",
  },
};

export default function StressReactivityProgramPage() {
  return (
    <div className={styles.program} id="top">
      <ProgramHeader
        shortName={program.identity.shortName}
        navigation={program.navigation}
      />
      <main>
        <section className={styles.hero}>
          <div className={`${styles.content} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <h1>{program.identity.heroTitle}</h1>
              <p className={styles.heroSubtitle}>
                {program.identity.heroSubtitle}
              </p>
              <p className={styles.methodology}>
                {program.identity.methodology}
              </p>
              <div className={styles.heroActions}>
                <a className={styles.programButton} href="#interesse">
                  {program.hero.interestCta}
                  <ArrowRight aria-hidden="true" />
                </a>
                <a
                  className={`${styles.programButton} ${styles.whatsappButton}`}
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={program.whatsapp.ariaLabel}
                >
                  {program.whatsapp.heroCta}
                  <MessageCircle aria-hidden="true" />
                </a>
                <a
                  className={`${styles.programButton} ${styles.quietButton}`}
                  href="#como-funciona"
                >
                  {program.hero.explanationCta}
                  <ArrowDown aria-hidden="true" />
                </a>
              </div>
            </div>
            <ProcessDiagram />
          </div>
        </section>

        <ProgramSection
          id="o-programa"
          eyebrow={program.recognition.eyebrow}
          title={program.recognition.title}
          tone="mist"
        >
          <div className={styles.recognitionIntro}>
            <p>{program.recognition.introduction}</p>
          </div>
          <ul className={styles.recognitionList}>
            {program.everyday.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.sectionClarification}>
            {program.recognition.clarification}
          </p>
        </ProgramSection>

        <ProgramSection title={program.repertoire.title}>
          <div className={styles.conceptLayout}>
            <div>
              <p className={styles.leadCopy}>{program.repertoire.lead}</p>
              <p>{program.repertoire.explanation}</p>
            </div>
            <div
              className={styles.repertoireSequence}
              aria-label={program.repertoire.ariaLabel}
            >
              {program.repertoire.steps.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </ProgramSection>

        <ProgramSection title={program.practiceSection.title} tone="sage">
          <p className={styles.sectionIntro}>
            {program.practiceSection.introduction}
          </p>
          <div className={styles.practiceGrid}>
            {program.practices.map((item, index) => (
              <article key={item} className={styles.practiceItem}>
                <span className={styles.practiceNumber}>0{index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </ProgramSection>

        <ProgramSection
          id="como-funciona"
          eyebrow={program.structure.eyebrow}
          title={program.structure.title}
        >
          <div className={styles.logisticsLayout}>
            <div className={styles.logisticsCopy}>
              <p className={styles.leadCopy}>{program.structure.lead}</p>
              <ul className={styles.checkList}>
                {program.structure.features.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <dl className={styles.logisticsTable}>
              {program.logistics.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd
                    className={
                      value === "A definir" ? styles.placeholder : undefined
                    }
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </ProgramSection>

        <ProgramSection title={program.curriculumSection.title} tone="mist">
          <p className={styles.sectionIntro}>
            {program.curriculumSection.introduction}
          </p>
          <div className={styles.curriculum}>
            {program.curriculum.map((week, index) => (
              <article className={styles.week} key={week.title}>
                <div className={styles.weekMarker}>
                  <span>{index + 1}</span>
                </div>
                <div>
                  <p className={styles.weekLabel}>
                    {program.curriculumSection.weekLabel} {index + 1}
                  </p>
                  <h3>{week.title}</h3>
                  <p>{week.description}</p>
                </div>
              </article>
            ))}
          </div>
        </ProgramSection>

        <ProgramSection id="para-quem-e" title={program.audience.title}>
          <div className={styles.whoLayout}>
            <ul className={styles.whoList}>
              {program.forWhom.map((item) => (
                <li key={item}>
                  <Circle aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <aside className={styles.sideNote}>
              <Sparkles aria-hidden="true" />
              <p>{program.audience.note}</p>
            </aside>
          </div>
        </ProgramSection>

        <ProgramSection title={program.boundaries.title} tone="ink">
          <div className={styles.notList}>
            {program.notFor.map((item) => (
              <p key={item}>
                <MoveRight aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </ProgramSection>

        <ProgramSection title={program.mindfulness.title}>
          <div className={styles.mindfulnessLayout}>
            <div className={styles.wordRing} aria-hidden="true">
              <span>{program.mindfulness.diagramWords[0]}</span>
              <i />
              <span>{program.mindfulness.diagramWords[1]}</span>
            </div>
            <div>
              <p className={styles.leadCopy}>{program.mindfulness.lead}</p>
              <p>{program.mindfulness.explanation}</p>
              <p>{program.mindfulness.methodology}</p>
            </div>
          </div>
        </ProgramSection>

        <ProgramSection
          id="facilitador"
          title={program.facilitatorSection.title}
          tone="sage"
        >
          <div
            className={
              program.facilitator.photo
                ? styles.facilitator
                : `${styles.facilitator} ${styles.facilitatorNoPhoto}`
            }
          >
            {program.facilitator.photo ? (
              <Image
                className={styles.facilitatorPhoto}
                src={program.facilitator.photo}
                alt={program.facilitator.photoAlt}
                width={768}
                height={1344}
                sizes="(max-width: 860px) 100vw, 340px"
              />
            ) : null}
            <div className={styles.facilitatorCopy}>
              <h3>{program.facilitator.name}</h3>
              <p className={styles.facilitatorMeta}>
                {program.facilitator.credentials}
                <br />
                {program.facilitator.focus}
                <br />
                {program.facilitator.location}
              </p>
              <p>{program.facilitator.description}</p>
            </div>
          </div>
        </ProgramSection>

        <ProgramSection
          id="duvidas"
          eyebrow={program.faqSection.eyebrow}
          title={program.faqSection.title}
        >
          <ProgramAccordion items={program.faqs} />
        </ProgramSection>

        <section id="interesse" className={styles.interestSection}>
          <div className={`${styles.content} ${styles.interestGrid}`}>
            <div className={styles.interestCopy}>
              <p className={styles.sectionKicker}>{program.interest.eyebrow}</p>
              <h2>{program.interest.title}</h2>
              <p>
                {waitlistFormOpen
                  ? program.interest.description
                  : program.interest.descriptionClosed}
              </p>

              <div className={styles.preRegistrationNote}>
                <Info aria-hidden="true" />
                <div>
                  <strong>{program.preRegistration.title}</strong>
                  <p>{program.preRegistration.explanation}</p>
                  <p>{program.preRegistration.confirmation}</p>
                </div>
              </div>

              <div className={styles.interestNote}>
                <Clock3 aria-hidden="true" />
                <span>{program.preRegistration.pending}</span>
              </div>

              <p className={styles.interestChoice}>
                {waitlistFormOpen
                  ? program.interest.choice
                  : program.interest.choiceClosed}
              </p>
              <a
                className={`${styles.programButton} ${styles.whatsappButton}`}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={program.whatsapp.ariaLabel}
              >
                {program.whatsapp.interestCta}
                <MessageCircle aria-hidden="true" />
              </a>

              <aside className={styles.safetyNote}>
                <LifeBuoy aria-hidden="true" />
                <div>
                  <strong>{program.safety.title}</strong>
                  <p>{program.safety.text}</p>
                  <p>
                    <strong>{program.safety.cvv}</strong>
                    <br />
                    {program.safety.emergency}
                  </p>
                </div>
              </aside>
            </div>
            <div className={styles.formShell}>
              <InterestForm copy={program.form} />
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`${styles.content} ${styles.finalCtaInner}`}>
            <div>
              <p>{program.finalCta.lead}</p>
              <h2>{program.finalCta.title}</h2>
            </div>
            <a
              className={`${styles.programButton} ${styles.clayButton}`}
              href="#interesse"
            >
              {program.finalCta.button}
              <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <div className={`${styles.content} ${styles.footerGrid}`}>
          <div>
            <a
              className={`${styles.brand} ${styles.footerBrand}`}
              href="#top"
            >
              <span className={styles.brandMark} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>{program.identity.shortName}</span>
            </a>
            <p>{program.footer.note}</p>
          </div>
          <div className={styles.footerContact}>
            <p>
              <strong>
                {program.facilitator.name} — {program.footer.role}
              </strong>
              <br />
              {program.footer.credentials}
              <br />
              {program.facilitator.location}
            </p>
            <p>
              <a href={`mailto:${program.contact.email}`}>
                {program.contact.email}
              </a>
              <br />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={program.whatsapp.ariaLabel}
              >
                {program.contact.whatsapp}
              </a>
            </p>
          </div>
          <nav aria-label={program.footer.legalAriaLabel}>
            <a href={program.footer.privacyHref}>{program.footer.privacy}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
