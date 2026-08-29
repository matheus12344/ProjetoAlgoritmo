"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "../program.module.css";
import type { ProgramNavigation } from "../program-data";

type ProgramHeaderProps = {
  shortName: string;
  navigation: ProgramNavigation;
};

export function ProgramHeader({ shortName, navigation }: ProgramHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.siteHeader}>
      <div className={`${styles.content} ${styles.headerInner}`}>
        <a
          className={styles.brand}
          href="#top"
          onClick={closeMenu}
          aria-label={navigation.homeAriaLabel}
        >
          <span className={styles.brandMark} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{shortName}</span>
        </a>
        <nav
          id="program-navigation"
          className={`${styles.mainNav} ${isOpen ? styles.mainNavOpen : ""}`}
          aria-label={navigation.ariaLabel}
        >
          {navigation.items.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a
            className={`${styles.programButton} ${styles.headerButton} ${styles.mobileOnly}`}
            href="#interesse"
            onClick={closeMenu}
          >
            {navigation.interestCta}
          </a>
        </nav>
        <a
          className={`${styles.programButton} ${styles.headerButton} ${styles.desktopOnly}`}
          href="#interesse"
        >
          {navigation.interestCta}
        </a>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls="program-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className={styles.srOnly}>
            {isOpen
              ? navigation.closeMenuLabel
              : navigation.openMenuLabel}
          </span>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
