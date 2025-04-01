export default function parse(element, { document }) {
  const tableData = [];

  // Create the block header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Carousel';
  tableData.push(headerRow);

  // Process rows content from the HTML structure
  const rows = Array.from(element.querySelectorAll('.twtr-grid'));
  rows.forEach((row) => {
    const image = row.querySelector('img');
    const title = row.querySelector('h2');
    const description = row.querySelector('p');
    const link = row.querySelector('a');

    const imageElement = document.createElement('img');
    if (image) {
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
    } else {
      imageElement.textContent = 'No image'; // Handle missing image edge case
    }

    const contentCell = [];

    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title.textContent;
      contentCell.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      contentCell.push(descriptionElement);
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      contentCell.push(linkElement);
    }

    tableData.push([imageElement, contentCell.length ? contentCell : 'No content']); // Handle empty content cell edge case
  });

  const carouselBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured block table
  element.replaceWith(carouselBlock);
}