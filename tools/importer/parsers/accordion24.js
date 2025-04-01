export default function parse(element, { document }) {
  // Create the header row with plain text, matching the example exactly
  const headerRow = ['Accordion'];

  const cells = [headerRow];

  // Select accordion item wrappers
  const items = element.querySelectorAll('.ct05__wrapper');

  items.forEach((item) => {
    const titleEl = item.querySelector('.ct05__headline h3');
    const contentEl = item.parentElement.querySelector('.ct05__content_inner');

    if (titleEl && contentEl) {
      const title = titleEl.textContent.trim();

      // Extract and simplify meaningful content
      const meaningfulContent = document.createElement('div');
      Array.from(contentEl.children).forEach((child) => {
        if (['P', 'UL', 'H6', 'A'].includes(child.tagName)) {
          meaningfulContent.appendChild(child.cloneNode(true));
        } else {
          for (const subChild of child.querySelectorAll('p, ul, h6, a')) {
            meaningfulContent.appendChild(subChild.cloneNode(true));
          }
        }
      });

      cells.push([title, meaningfulContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}