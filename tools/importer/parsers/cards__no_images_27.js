export default function parse(element, { document }) {
  const cells = [];

  // Create the header row matching the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Select all unique card containers and process them
  const cardItems = element.querySelectorAll('.ct07__content-item .ct01-columns');

  const seenHeadlines = new Set();

  cardItems.forEach((cardItem) => {
    const headlineElement = cardItem.querySelector('.b01__headline');
    const descriptionElement = cardItem.querySelector('.b02-rich-text');
    const ctaElement = cardItem.querySelector('.b03-button-v3 a');

    const cardContent = [];

    // Add headline if not already processed
    if (headlineElement) {
      const headlineText = headlineElement.textContent.trim();
      if (seenHeadlines.has(headlineText)) {
        return; // Skip duplicate headline
      }
      seenHeadlines.add(headlineText);

      const headline = document.createElement('h4');
      headline.textContent = headlineText;
      cardContent.push(headline);
    }

    // Add description
    if (descriptionElement) {
      const description = document.createElement('p');
      description.textContent = descriptionElement.textContent.replace(/\s+/g, ' ').trim(); // Remove unnecessary line breaks and spaces
      cardContent.push(description);
    }

    // Add CTA
    if (ctaElement) {
      const link = document.createElement('a');
      link.href = ctaElement.href;
      link.textContent = ctaElement.textContent.trim();
      cardContent.push(link);
    }

    // Ensure valid content for the row
    if (cardContent.length > 0) {
      cells.push([cardContent]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}