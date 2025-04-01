export default function parse(element, { document }) {
    // Create the header row for the table
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Carousel';

    // Extract all slides (each slide corresponds to country selection with radio buttons and label)
    const slides = [...element.querySelectorAll('.btc13-form-option')];

    // Prepare rows by extracting relevant data for each slide
    const rows = slides.map(slide => {
        const imageContainer = document.createElement('img');
        // Dynamically extract the image source and alt text from the radio button value and label text
        imageContainer.src = slide.querySelector('input')?.value || '';
        imageContainer.alt = slide.querySelector('span')?.textContent?.trim() || '';

        // Create a text container to hold title and description
        const textContent = document.createElement('div');
        const title = document.createElement('h2');
        const description = document.createElement('p');

        title.textContent = slide.querySelector('.FormField-labelText')?.textContent || '';
        description.textContent = slide.querySelector('.btc13-filter-label')?.textContent || '';

        textContent.append(title, description);

        // Each row contains the image in the first cell and text content in the second cell
        return [imageContainer, textContent];
    });

    // Combine header row and slide rows into the data structure for the table
    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}