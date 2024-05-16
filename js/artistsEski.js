// Function to fetch JSON data from a URL
async function fetchArtistForCategory() {
    try {
        const response = await fetch('artists_for_category.json');
        const artworks = await response.json();
        return artworks;
    } catch (error) {
        console.error('Error fetching artists:', error);
        return [];
    }
}
async function fetchArtists() {
    try {
        const response = await fetch('artists.json');
        const artists = await response.json();
        return artists;
    } catch (error) {
        console.error('Error fetching artists:', error);
        return [];
    }
}

async function populateArtists() {
    const categoriesContainer = document.getElementById('categories-container');

    try {
        // Fetch artworks data
        const categories = await fetchArtistForCategory();

        // Loop through each category
        for (const categoryItem of categories) {
            // Create a new category section
            const categorySection = document.createElement('div');
            categorySection.classList.add('category-section');

            // Create category title
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = categoryItem.category;
            categorySection.appendChild(categoryTitle);

            // Create artist buttons for the category
            const artistButtonsContainer = document.createElement('div');
            artistButtonsContainer.classList.add('artist-buttons-container');


            categoryItem.artists.forEach(artistName => {
                const artistButton = document.createElement('button');
                artistButton.setAttribute('type', 'button');
                artistButton.classList.add('btn', 'btn-dark');

                // Create and add image element (GIF) to the button
                const gifImage = document.createElement('img');
                gifImage.classList.add("artistImg")
                gifImage.src = './img/painting.png'; // Path to your GIF file
                gifImage.alt = 'Loading...'; // Optional, alt text for accessibility
                artistButton.appendChild(gifImage); // Append the GIF image to the button

                // Create a paragraph element for artist name
                const artistNameParagraph = document.createElement('p');
                artistNameParagraph.textContent = artistName;
                artistButton.appendChild(artistNameParagraph);

                

                artistButton.addEventListener('click', async () => {
                    try {
                        const artistsData = await fetchArtists(); // Sanatçı bilgilerini al

                        // Sanatçı bilgilerini sanatçı adına göre bul
                        const artistInfo = artistsData.find(artist => artist.ArtistName === artistName);
                        
                        if (artistInfo) {
                            const params = new URLSearchParams({
                                artistName: artistInfo.ArtistName,
                                date: artistInfo.Date,
                                nationality: artistInfo.Nationality,
                                bio: artistInfo.Bio,
                                artworks: JSON.stringify(artistInfo.Artworks)
                            });
                            
                            window.location.href = `./artistDetail.html?${params.toString()}`;
                        } else {
                            console.error(`Artist '${artistName}' not found in the database.`);
                        }
                    } catch (error) {
                        console.error('Error fetching artist information:', error);
                    }
                });


                artistButtonsContainer.appendChild(artistButton);
            });

            categorySection.appendChild(artistButtonsContainer);
            categoriesContainer.appendChild(categorySection);
        }
    } catch (error) {
        console.error('Error populating artists:', error);
    }
}


document.addEventListener('DOMContentLoaded', async function () {


    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('artistName');
    const date = urlParams.get('date');
    const nationality = urlParams.get('nationality');
    const bio = urlParams.get('bio');
    const artworks= urlParams.get('artworks');

    if (artistName) {
        // Update HTML content with artist information
        const artistNameElement = document.getElementById('artistName');
        artistNameElement.textContent = `${artistName}`;

        const dateElement = document.getElementById('date');
        if (date) {
            dateElement.textContent = `Date: ${date}`;
        }

        const nationalityElement = document.getElementById('nationality');
        if (nationality) {
            nationalityElement.textContent = `Nationality: ${nationality}`;
        }

        const bioElement = document.getElementById('bio');
        if (bio) {
            bioElement.textContent = `${bio}`;
        }

        if (artworks) {
            // Convert artworks (which is a JSON string) back to an array
            const artworksArray = JSON.parse(artworks);
            // Display artwork names side by side
            const artworkNamesContainer = document.getElementById('artworkNamesContainer');
            artworkNamesContainer.textContent= "Artworks:";
            artworksArray.forEach(artwork => {
                const artworkNameElement = document.createElement('span');
                artworkNameElement.textContent = artwork ;
                artworkNameElement.classList.add('artwork-name');
                artworkNamesContainer.appendChild(artworkNameElement);
            });
        }

    }

    // Add event listener to search input for real-time filtering
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterArtists);
});
// Function to filter artist buttons based on search input
function filterArtists() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.trim().toLowerCase();
    const artistButtons = document.querySelectorAll('.artist-buttons-container button');

    // Loop through each artist button to check for match
    artistButtons.forEach(button => {
        const artistName = button.textContent.toLowerCase();
        const categorySection = button.closest('.category-section');

        // Toggle visibility based on search match
        if (artistName.includes(searchText)) {
            button.style.display = 'block'; // Show matching artist button
            categorySection.style.display = 'block'; // Show corresponding category section
        } else {
            button.style.display = 'none'; // Hide non-matching artist button
            // Check if all artist buttons are hidden in the category section
            const visibleButtons = categorySection.querySelectorAll('.artist-buttons-container button[style="display: block;"]');
            if (visibleButtons.length === 0) {
                categorySection.style.display = 'none'; // Hide category section if no buttons are visible
            }
        }
    });
}


// Call the function to populate the gallery
populateArtists();
