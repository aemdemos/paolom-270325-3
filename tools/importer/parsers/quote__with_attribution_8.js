export default function parse(element, { document }) {
  // Helper function to extract content
  const extractContent = (query, parent = document) => {
    const el = parent.querySelector(query);
    return el ? el.textContent.trim() : '';
  };

  // Extract quote text
  const quoteText = extractContent('.b14__quote-text', element);

  // Extract attribution
  const authorName = extractContent('.b14__author-name', element);
  const authorTitle = extractContent('.b14__author-title', element);

  // Create table rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  const quoteRow = [quoteText];
  const attributionRow = [`${authorName} ${authorTitle}`];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    quoteRow,
    attributionRow
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}