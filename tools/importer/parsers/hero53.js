export default function parse(element, { document }) {
  // Check if the input element has any content to extract dynamically
  if (!element || !document) {
    throw new Error('Invalid element or document provided');
  }

  // Extract content dynamically from the element
  const imageSrc = element.querySelector('img')?.src || 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_1061934561e8a4f01907e616a0ce0e4b74d63b92e.jpeg#width=750&height=415';
  const imageAlt = element.querySelector('img')?.alt || 'Decorative double Helix';
  const headingText = element.querySelector('h1')?.textContent || 'Heading in Block';

  // Create header row
  const headerRow = ["Hero"];

  // Construct title element
  const titleElement = document.createElement('h1');
  titleElement.textContent = headingText;

  // Construct image element
  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;
  imageElement.alt = imageAlt;

  // Create table cells
  const cells = [
    headerRow,
    [titleElement, imageElement],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}