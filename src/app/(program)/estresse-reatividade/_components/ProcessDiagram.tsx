import {
  ArrowRight,
  CirclePause,
  Eye,
  MessageCircleMore,
  Zap,
} from "lucide-react";
import styles from "../program.module.css";
import { program } from "../program-data";

const icons = [Zap, Eye, CirclePause, MessageCircleMore] as const;

export function ProcessDiagram() {
  return (
    <div className={styles.processDiagram} aria-label={program.process.ariaLabel}>
      <p className={styles.diagramLead}>{program.process.lead}</p>
      <div className={styles.processSteps}>
        {program.process.steps.map((label, index) => {
          const Icon = icons[index];

          return (
            <div className={styles.processStep} key={label}>
              <span className={styles.processIcon}>
                <Icon aria-hidden="true" />
              </span>
              <span>{label}</span>
              {index < program.process.steps.length - 1 ? (
                <ArrowRight
                  className={styles.processArrow}
                  aria-hidden="true"
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <p className={styles.diagramNote}>{program.process.note}</p>
    </div>
  );
}
