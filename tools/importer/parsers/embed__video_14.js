export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const videoURL = 'https://vimeo.com/454418448'; // Replace this with dynamic extraction if applicable
  const imageURL = element.querySelector('img')?.src || 'https://via.placeholder.com/450x1264';

  // Create header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Create content row
  const image = document.createElement('img');
  image.src = imageURL;

  const videoLink = document.createElement('a');
  videoLink.href = videoURL;
  videoLink.textContent = videoURL;

  const contentRow = [document.createElement('div')];
  contentRow[0].append(image, document.createElement('br'), videoLink);

  // Assemble table
  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}