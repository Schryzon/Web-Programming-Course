// github.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projects-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const username = 'Schryzon';

    async function fetchRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);

            if (!response.ok) {
                throw new Error('Failed to fetch repositories from GitHub');
            }

            const repos = await response.json();

            loadingMessage.style.display = 'none';

            if (repos.length === 0) {
                container.innerHTML = '<p>No public repositories found.</p>';
                return;
            }

            repos.forEach(repo => {
                // Ignore forks (optional)
                if (repo.fork) return;

                const card = document.createElement('div');
                card.className = 'project-card';

                const description = repo.description || 'No description provided.';

                // GitHub Social Preview Image URL (requires a hash to bypass cache and work reliably)
                const imageUrl = `https://opengraph.githubassets.com/${repo.id}/${username}/${repo.name}`;

                card.innerHTML = `
                    <div class="project-image-container">
                        <span class="image-fallback-text">Loading...</span>
                        <img src="${imageUrl}" alt="${repo.name} preview" class="project-image" loading="lazy"
                             onload="this.previousElementSibling.style.display='none'"
                             onerror="this.previousElementSibling.textContent='Preview Unavailable'; this.style.display='none'">
                    </div>
                    <div class="project-card-content">
                        <h3>${repo.name}</h3>
                        <p>${description}</p>
                        <div class="project-stats" style="margin-top: 10px; font-size: 0.85em; color: #888;">
                            <span>⭐ ${repo.stargazers_count}</span> | 
                            <span>🍴 ${repo.forks_count}</span> | 
                            <span>${repo.language || 'Plain Text'}</span>
                        </div>
                        <a href="${repo.html_url}" class="repo-link" target="_blank" rel="noopener noreferrer">View Repo</a>
                    </div>
                `;

                container.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            loadingMessage.style.display = 'none';
            errorMessage.textContent = 'Oops! ' + error.message;
            errorMessage.style.display = 'block';
        }
    }

    fetchRepos();
});
