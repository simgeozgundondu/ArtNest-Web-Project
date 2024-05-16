// Function to fetch JSON data from a URL
async function fetchArtworks() {
    try {
        const response = await fetch('./json/artworks.json');
        const artworks = await response.json();
        return artworks;
    } catch (error) {
        console.error('Error fetching artworks:', error);
        return [];
    }
}




document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const artwork = urlParams.get('artwork');
    const artist = urlParams.get('artist');
    const artworkUrl = urlParams.get('image_url');

    if (artwork && artist && artworkUrl) {
        // Update HTML content with artwork and artist information
        const artworkTitleElement = document.getElementById('artworkTitle');
        const artistNameElement = document.getElementById('artistName');
        const artworkImageElement = document.getElementById('artworkImage');

        artworkTitleElement.textContent = artwork;
        artistNameElement.textContent = artist;
        artworkImageElement.src = artworkUrl;
        artworkImageElement.alt = artwork;
    } else {
        console.error('Missing or invalid artwork information in URL parameters');
    }
});