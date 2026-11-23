/**
 * Parses multi-line description text into an array of clean bullet point strings.
 * Automatically removes existing bullet characters (•, -, *, numbers) and trims whitespace.
 */
export const parseBulletPoints = (text) => {
  if (!text || typeof text !== 'string') return [];
  return text
    .split('\n')
    .map((line) => line.trim().replace(/^([•\-\*]|\d+[\.\)])\s*/, ''))
    .filter((line) => line.length > 0);
};

/**
 * Checks if personal information has at least one contact item filled.
 */
export const hasContactInfo = (personal) => {
  if (!personal) return false;
  return Boolean(
    personal.email ||
    personal.phone ||
    personal.location ||
    personal.linkedin ||
    personal.github ||
    personal.website
  );
};
