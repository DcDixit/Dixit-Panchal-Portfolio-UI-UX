import { Fragment } from "react";

/**
 * Renders a content string where **double asterisks** mark emphasised words.
 * Keeps emphasis in the content files instead of in markup.
 */
export function Rich({ text, emClassName = "font-semibold text-ink" }: { text: string; emClassName?: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={emClassName}>
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text with the emphasis markers removed (for titles, alt text and meta). */
export const plain = (text: string) => text.replace(/\*\*/g, "");
