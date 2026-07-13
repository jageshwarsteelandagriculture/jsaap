/**
 * Replace `{placeholder}` tokens in a dictionary string.
 *
 *   fill(dict.footer.copyright, { year: 2026, company: "Acme" })
 *
 * An unknown token is left as-is rather than rendering "undefined", so a typo
 * shows up as visible `{company}` text instead of silently corrupting a page.
 */
export function fill(
  template: string,
  vars: Record<string, string | number> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
