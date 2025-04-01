export default function parse(element, { document }) {
    // Critical examination and implementation begin

    // Create the header row for the block
    const headerRow = document.createElement('strong');
    headerRow.textContent = 'Video';

    let videoSrc = null;
    let posterImage = null;

    // Extract the video source dynamically
    const videoElement = element.querySelector('video');
    if (videoElement) {
        videoSrc = videoElement.getAttribute('src');
    }

    // Extract poster image dynamically
    const posterElement = element.querySelector('picture > img');
    if (posterElement) {
        posterImage = posterElement.getAttribute('data-src');
    }

    // Handle edge cases - default to empty string if missing
    const videoCellContent = [];
    if (videoSrc) {
        const videoLink = document.createElement('a');
        videoLink.setAttribute('href', videoSrc);
        videoLink.textContent = videoSrc;
        videoCellContent.push(videoLink);
    }

    if (posterImage) {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', posterImage);
        videoCellContent.push(imgElement);
    }

    // Construct the table cells for the Video block
    const cells = [
        [headerRow], // Header row
        [videoCellContent] // Content row
    ];

    // Create the table block using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}