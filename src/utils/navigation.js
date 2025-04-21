// Place this in a utility file like src/utils/navigation.js

/**
 * Find the next page in the flow based on the current page code
 * @param {Array} pages - Array of page configurations from Redux
 * @param {String} currentPageCode - The code of the current page
 * @returns {Object|null} - The next page object or null if not found
 */
export const findNextPage = (pages, currentPageCode) => {
  if (!pages || pages.length === 0) return null;

  // Find the index of the current page
  const currentIndex = pages.findIndex(page => page.metadata.code === currentPageCode);

  // If found and not the last page, return the next page
  if (currentIndex !== -1 && currentIndex < pages.length - 1) {
    return pages[currentIndex + 1];
  }

  return null;
};

/**
 * Find the previous page in the flow based on the current page code
 * @param {Array} pages - Array of page configurations from Redux
 * @param {String} currentPageCode - The code of the current page
 * @returns {Object|null} - The previous page object or null if not found
 */
export const findPrevPage = (pages, currentPageCode) => {
  if (!pages || pages.length === 0) return null;

  // Find the index of the current page
  const currentIndex = pages.findIndex(page => page.metadata.code === currentPageCode);

  // If found and not the first page, return the previous page
  if (currentIndex > 0) {
    return pages[currentIndex - 1];
  }

  return null;
};
