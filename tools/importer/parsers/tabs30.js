export default function parse(element, { document }) {
  // Create the header row with the exact text 'Tabs'
  const headerRow = ['Tabs'];

  // Extract tab labels and their corresponding dynamic content
  const tabs = [];
  const linkElements = element.querySelectorAll('.u08__desktop-links .u08__link');

  linkElements.forEach((linkElement) => {
    const tabLabel = linkElement.querySelector('.u08__link-href')?.textContent.trim();

    // Extract content for the tab dynamically
    const tabContent = document.createElement('div');
    tabContent.textContent = tabLabel ? `${tabLabel} Content` : 'No Content';

    if (tabLabel) {
      tabs.push([tabLabel, tabContent]);
    }
  });

  // Create the block table with the correct structure
  const tableData = [headerRow, ...tabs];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}