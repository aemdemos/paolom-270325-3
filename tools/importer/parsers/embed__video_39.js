export default function parse(element, { document }) {
    // Extract relevant data dynamically from the element
    const linkElement = element.querySelector('a[href]:not([href="about:blank"]):not([href="#twtr-main"])');
    const videoURL = linkElement ? linkElement.href : '';

    const imageElement = element.querySelector('img');
    const imageURL = imageElement ? imageElement.src : '';

    // Create the image element dynamically if an image URL exists
    const img = imageURL ? document.createElement('img') : null;
    if (img) {
        img.src = imageURL;
        img.alt = 'Video Thumbnail';
    }

    // Ensure header row matches the example precisely
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Embed';
    const headerRow = [headerCell];

    // Combine video URL and image into a single cell
    const contentRow = img ? [img, document.createTextNode(videoURL)] : [document.createTextNode(videoURL)];

    // Create the structured table data
    const cells = [headerRow, contentRow];

    // Use helper function to create the table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}