document.addEventListener('DOMContentLoaded', () => {
    const videoGrid = document.querySelector('.video-grid');
    const API_KEY = 'AIzaSyAfSy6s9CsSk6fvGRPJ2f0LCTTLAlY5GIU';  // Replace with your actual API key
    const channelID = 'UC6-F5tO8uklgE9Zy8IvbdFw';  // Replace with the channel ID you want to fetch videos from
    const maxResults = 8;  // Number of videos to fetch

    // Fetch videos from YouTube Data API
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${maxResults}`)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');

                videoCard.innerHTML = `
                    <img src="${video.snippet.thumbnails.high.url}" alt="Video Thumbnail">
                    <div class="video-info">
                        <h4>${video.snippet.title}</h4>
                        <p>${video.snippet.channelTitle} • ${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
                    </div>
                `;

                videoGrid.appendChild(videoCard);
            });

            // Add event listeners to new video cards
            document.querySelectorAll('.video-card').forEach(card => {
                card.addEventListener('click', () => {
                    const videoTitle = card.querySelector('h4').textContent;
                    alert('Now playing: ' + videoTitle);
                    // Replace alert with code to play the video
                });
            });
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
});
