export default function parse(element, { document }) {
  const tables = [];

  // Extract each slide content from the carousel
  const slides = element.querySelectorAll('.ct06__slide-content');

  slides.forEach((slide) => {
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Embed';
    const headerRow = [headerCell];

    const img = slide.querySelector('img');

    if (img) {
      const contentRow = [
        document.createElement('a'),
      ];
      contentRow[0].setAttribute('href', img.src);
      contentRow[0].textContent = img.src;

      const table = WebImporter.DOMUtils.createTable([
        headerRow,
        contentRow,
      ], document);

      tables.push(table);
    }
  });

  // Add horizontal rules between tables
  const container = document.createElement('div');
  tables.forEach((table, index) => {
    container.appendChild(table);
    if (index < tables.length - 1) {
      container.appendChild(document.createElement('hr'));
    }
  });

  // Replace the original element with the structured container
  element.replaceWith(container);
}