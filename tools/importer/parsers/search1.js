export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Search';

  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const urlCell = document.createElement('a');
  urlCell.href = queryIndexUrl;
  urlCell.textContent = queryIndexUrl;

  const tableContent = [
    headerRow,
    [urlCell],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  element.replaceWith(blockTable);
}