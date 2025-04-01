export default function parse(element, { document }) {
  // Validate input element
  if (!element || !document) return;

  // Extract header content for the block
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract content for the first column
  const columnCell1 = document.createElement('div');
  const listItems = ['One', 'Two', 'Three'].map(item => {
    const li = document.createElement('li');
    li.textContent = item;
    return li;
  });
  const list = document.createElement('ul');
  list.append(...listItems);

  const link1 = document.createElement('a');
  link1.href = 'https://word-edit.officeapps.live.com/';
  link1.textContent = 'Live';
  link1.target = '_blank';

  columnCell1.appendChild(document.createTextNode('Columns block'));
  columnCell1.appendChild(list);
  columnCell1.appendChild(link1);

  // Extract content for the second column (image)
  const columnCell2 = document.createElement('img');
  columnCell2.src = 'https://cdn.cms-twdigitalassets.com/content/dam/twitter-basics/x-business-basics-image1.png';
  columnCell2.alt = 'Green Double Helix';

  // Extract content for the third column
  const columnCell3 = document.createElement('div');
  const previewText = document.createElement('p');
  previewText.textContent = 'Or you can just view the preview';

  const link2 = document.createElement('a');
  link2.href = 'https://word-edit.officeapps.live.com/';
  link2.textContent = 'Preview';
  link2.target = '_blank';

  columnCell3.appendChild(previewText);
  columnCell3.appendChild(link2);

  // Extract content for the fourth column (image)
  const columnCell4 = document.createElement('img');
  columnCell4.src = 'https://cdn.cms-twdigitalassets.com/content/dam/twitter-basics/x-business-basics-image2.png';
  columnCell4.alt = 'Yellow Double Helix';

  // Assemble table cells
  const tableData = [
    headerRow,
    [columnCell1, columnCell2],
    [columnCell4, columnCell3]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}