export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const columns = Array.from(element.querySelectorAll('.ct01__column')).map((column) => {
    const text = column.querySelector('h5')?.textContent || '';
    const paragraph = column.querySelector('p')?.textContent || '';
    const button = column.querySelector('a');

    const buttonElement = document.createElement('a');
    buttonElement.href = button?.href || '#';
    buttonElement.textContent = button?.textContent || '';

    const content = document.createElement('div');

    const titleElement = document.createElement('h3');
    titleElement.textContent = text;
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph;

    content.appendChild(titleElement);
    content.appendChild(paragraphElement);
    content.appendChild(buttonElement);

    return content;
  });

  const cells = [headerRow, columns];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
  return block;
}