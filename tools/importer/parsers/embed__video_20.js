export default function parse(element, { document }) {
  // Extract content from the provided HTML element
  const headlineElement = element.querySelector('.b01__headline');
  const profileImgElement = element.querySelector('.btc11__profile-img');
  const authorElement = element.querySelector('.btc11__author-name');
  const labelElement = element.querySelector('.Label');

  const headline = headlineElement ? headlineElement.textContent.trim() : '';
  const profileImg = profileImgElement ? profileImgElement.src : '';
  const author = authorElement ? authorElement.textContent.trim() : '';
  const label = labelElement ? labelElement.textContent.trim() : '';

  // Prepare structured table cells
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  const contentRow = [];

  if (profileImg) {
    const imgElement = document.createElement('img');
    imgElement.src = profileImg;
    imgElement.alt = author;
    contentRow.push(imgElement);
  }

  if (headline) {
    const headlineText = document.createTextNode(headline);
    contentRow.push(headlineText);
  }

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable([headerRow, [contentRow]], document);

  // Replace the original element with the newly created block
  element.replaceWith(block);
}