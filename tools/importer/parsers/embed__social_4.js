export default function parse(element, { document }) {
  // Helper function to extract text content from elements
  const extractText = (el) => {
    if (!el) return '';
    return el.textContent?.trim() || '';
  };

  // Campaign Objective
  const campaignHeadlineElement = element.querySelector('.b01__headline');
  const campaignTextElement = element.querySelector('.b02__rich-text p');

  const campaignHeadline = extractText(campaignHeadlineElement);
  const campaignText = extractText(campaignTextElement);

  const campaignHeaderCell = document.createElement('strong');
  campaignHeaderCell.textContent = campaignHeadline;

  const objectiveTable = WebImporter.DOMUtils.createTable([
    [campaignHeaderCell],
    [document.createTextNode(campaignText)],
  ], document);

  // Solution
  const solutionHeadlineElement = element.querySelectorAll('.b01__headline')[1];
  const solutionTextElement = element.querySelectorAll('.b02__rich-text p')[1];

  const solutionHeadline = extractText(solutionHeadlineElement);
  const solutionText = extractText(solutionTextElement);

  const solutionHeaderCell = document.createElement('strong');
  solutionHeaderCell.textContent = solutionHeadline;

  const solutionTable = WebImporter.DOMUtils.createTable([
    [solutionHeaderCell],
    [document.createTextNode(solutionText)],
  ], document);

  // Products Used
  const productsHeadlineElement = element.querySelectorAll('.b01__headline')[2];
  const productsListElement = element.querySelector('.b02__rich-text ul');

  const productsHeadline = extractText(productsHeadlineElement);

  const productsHeaderCell = document.createElement('strong');
  productsHeaderCell.textContent = productsHeadline;

  const productsListItems = productsListElement ? Array.from(productsListElement.querySelectorAll('li')).map(item => document.createTextNode(extractText(item))) : [];

  const productsTable = WebImporter.DOMUtils.createTable([
    [productsHeaderCell],
    [productsListItems],
  ], document);

  // Combine tables with separators (hr elements)
  const blockContent = [
    objectiveTable,
    document.createElement('hr'),
    solutionTable,
    document.createElement('hr'),
    productsTable,
  ];

  // Create a container for the new block
  const container = document.createElement('div');
  blockContent.forEach(item => container.appendChild(item));

  // Replace original element with container
  element.replaceWith(container);
}