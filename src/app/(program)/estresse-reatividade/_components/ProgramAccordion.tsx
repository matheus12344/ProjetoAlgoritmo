import { ChevronDown } from "lucide-react";
import styles from "../program.module.css";
import type { Faq } from "../program-data";

export function ProgramAccordion({ items }: { items: Faq[] }) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details className={styles.accordionItem} key={item.question}>
          <summary>
            <span>{item.question}</span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className={styles.accordionAnswer}>
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
