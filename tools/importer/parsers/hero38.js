export default function parse(element, { document }) {
  // Prepare the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract the heading (mandatory)
  const headingElement = element.querySelector('h4.f01__alert-copy');
  const heading = document.createElement('h1');
  heading.textContent = headingElement ? headingElement.textContent : '';

  // Extract the call-to-action (optional)
  const buttonElement = element.querySelector('button.f01__submit-button');
  const cta = document.createElement('a');
  if (buttonElement) {
    cta.textContent = buttonElement.textContent;
    cta.setAttribute('href', '#'); // Placeholder for the button link
  }

  // Combine extracted elements into table rows
  const cells = [
    headerRow, // Header row
    [
      heading,
      cta,
    ],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}