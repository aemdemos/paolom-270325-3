export default function parse(element, { document }) {
  // Validate input
  if (!element || !document) {
    throw new Error('Invalid arguments. Element and document are required.');
  }

  // Extract video URL dynamically
  const videoSource = element.querySelector('.t01__video video source');
  const videoUrl = videoSource?.src;

  if (!videoUrl) {
    throw new Error('Video URL not found in the provided element.');
  }

  // Create Header Row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Create Content Row with the extracted video URL
  const contentRow = [document.createTextNode(videoUrl)];

  // Create the block table using WebImporter.DOMUtils
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}