export default function parse(element, { document }) {
  // Helper function to dynamically extract data from each partner section
  const extractCardData = (partnerElement) => {
    const headlineElement = partnerElement.querySelector('.sp07__headline');
    const headlineText = headlineElement ? headlineElement.textContent.trim() : '';

    const imageElement = partnerElement.querySelector('.sp07__media-image');
    const image = document.createElement('img');
    if (imageElement) {
      image.src = imageElement.src;
      image.alt = imageElement.alt || '';
      image.title = imageElement.title || '';
    }

    const copyElement = partnerElement.querySelector('.sp07__copy p');
    const copyText = copyElement ? copyElement.textContent.trim() : '';

    const ctaElement = partnerElement.querySelector('.sp07__cta-copy a');
    const ctaLink = document.createElement('a');
    if (ctaElement) {
      ctaLink.href = ctaElement.href;
      ctaLink.textContent = ctaElement.textContent.trim();
    }

    const textCellContent = [];

    if (headlineText) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = headlineText;
      textCellContent.push(titleElement);
    }

    if (copyText) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = copyText;
      textCellContent.push(descriptionElement);
    }

    if (ctaElement) {
      const ctaContainer = document.createElement('div');
      ctaContainer.appendChild(ctaLink);
      textCellContent.push(ctaContainer);
    }

    return [image, textCellContent];
  };

  // Select all partner elements
  const partnerElements = element.querySelectorAll('.sp05__partner');

  // Prepare rows for the table
  const rows = [];

  // Add header row with exact matching structure
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  // Loop through partner elements to dynamically extract data
  partnerElements.forEach((partnerElement) => {
    rows.push(extractCardData(partnerElement));
  });

  // Create the block table using the extracted rows
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the newly created block
  element.replaceWith(blockTable);
}