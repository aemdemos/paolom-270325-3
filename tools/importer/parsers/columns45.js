export default function parse(element, { document }) {
  // Helper function to extract and format content
  const extractNavItems = (selector) => {
    const items = Array.from(element.querySelectorAll(selector));
    return items.map((item) => {
      const link = item.querySelector('a');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        return anchor;
      }
      return document.createTextNode(item.textContent.trim());
    });
  };

  // Header row for the table
  const headerRow = ['Columns'];

  // Main content rows
  const leftColumnContent = extractNavItems('.ct07__nav-list .ct07__nav-item');
  const rightColumnImage = element.querySelector('.ct07__icon--arrow-down svg');

  const cells = [
    // Header row
    headerRow,
    // Content rows
    [
      leftColumnContent,
      rightColumnImage
    ]
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}