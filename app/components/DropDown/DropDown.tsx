"use client";

import { useState, useRef, useEffect } from "react";
import css from "./DropDown.module.css";

interface Props {
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string | null;
  onChange: (value: string) => void;
}

export default function DropDown({
  label,
  placeholder,
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper} ref={boxRef}>
      <p className={css.label}>{label}</p>

      <button
        type="button"
        className={css.toggle}
        onClick={() => setOpen(!open)}
      >
        <span>{value || placeholder}</span>
        <svg
          width="16"
          height="16"
          className={css.arrow}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <use href="/sprite.svg#icon-Property-1Default-1" />
        </svg>
      </button>

      {open && (
        <ul className={css.list}>
          {options.map((opt) => (
            <li
              key={opt}
              className={css.item}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
