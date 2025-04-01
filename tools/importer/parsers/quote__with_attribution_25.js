export default function parse(element, { document }) {
    // Extract the quote
    const quoteText = element.querySelector('.b14__quote-text')?.textContent.trim();

    // Extract the author and title
    const authorName = element.querySelector('.b14__author-name')?.textContent.trim();
    const authorTitle = element.querySelector('.b14__author-title')?.textContent.trim();

    // Extract the call-to-action link text and URL
    const ctaElement = element.querySelector('.b03__button');
    const ctaText = ctaElement?.textContent.trim();
    const ctaLink = ctaElement?.getAttribute('href');

    // Create the header row for the table
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Quote';
    const headerRow = [headerCell];

    // Create the quote row
    const quoteCell = document.createElement('blockquote');
    quoteCell.textContent = quoteText;
    const quoteRow = [quoteCell];

    // Create the attribution row (author and title)
    const attributionCell = document.createElement('span');
    attributionCell.textContent = `${authorName}, ${authorTitle}`;
    const attributionRow = [attributionCell];

    // Append call-to-action row if available
    const rows = [
        headerRow,
        quoteRow,
        attributionRow,
    ];

    if (ctaText && ctaLink) {
        const ctaCell = document.createElement('a');
        ctaCell.textContent = ctaText;
        ctaCell.setAttribute('href', ctaLink);
        rows.push([ctaCell]);
    }

    // Generate the block table
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}