export default function parse(element, { document }) {
  // Extract the content dynamically from the element
  const linkElement = element.querySelector('a');
  const linkHref = linkElement ? linkElement.href.trim() : '';
  const linkText = linkElement ? linkElement.textContent.replace(/\s+/g, ' ').trim() : '';

  // Create header row dynamically to match the example exactly
  const headerRow = ['Embed'];

  // Create content row with dynamically extracted link
  const contentRow = [];
  if (linkHref) {
    const embedLink = document.createElement('a');
    embedLink.href = linkHref;
    embedLink.textContent = linkText || linkHref; // Use link text if available, fallback to href
    contentRow.push(embedLink);
  }

  const tableData = [headerRow, [contentRow]];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new table structure
  element.replaceWith(block);
}