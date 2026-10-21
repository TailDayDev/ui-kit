/** Read-only card for a value that cannot be edited, with a padlock on the right. */
export interface CardLockedProps {
  /** Field name (`headline/bold`, one line, truncated). */
  title: string;
  /** Field value (`body/regular`). */
  value: string;
  /** Test identifier of the card container. */
  testID?: string;
}
