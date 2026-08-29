import type { ReactNode } from "react";
import styles from "../program.module.css";

type ProgramSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  tone?: "plain" | "mist" | "ink" | "sage";
};

const toneClasses = {
  plain: styles.sectionPlain,
  mist: styles.sectionMist,
  ink: styles.sectionInk,
  sage: styles.sectionSage,
};

export function ProgramSection({
  id,
  eyebrow,
  title,
  children,
  tone = "plain",
}: ProgramSectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${toneClasses[tone]}`}
    >
      <div className={styles.content}>
        <div className={styles.sectionHeading}>
          {eyebrow ? <p className={styles.sectionKicker}>{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
