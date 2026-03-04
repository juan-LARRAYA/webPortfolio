/**
 * Splits text into individual characters or words for animation
 */

export type SplitType = 'chars' | 'words' | 'lines';

export interface SplitTextResult {
  original: string;
  parts: string[];
  type: SplitType;
}

/**
 * Splits text by characters
 */
export function splitByChars(text: string): SplitTextResult {
  return {
    original: text,
    parts: text.split(''),
    type: 'chars',
  };
}

/**
 * Splits text by words
 */
export function splitByWords(text: string): SplitTextResult {
  return {
    original: text,
    parts: text.split(/\s+/),
    type: 'words',
  };
}

/**
 * Splits text by lines (based on line breaks)
 */
export function splitByLines(text: string): SplitTextResult {
  return {
    original: text,
    parts: text.split('\n'),
    type: 'lines',
  };
}

/**
 * Main split function with auto-detection
 */
export function splitText(text: string, type: SplitType = 'chars'): SplitTextResult {
  switch (type) {
    case 'chars':
      return splitByChars(text);
    case 'words':
      return splitByWords(text);
    case 'lines':
      return splitByLines(text);
    default:
      return splitByChars(text);
  }
}
