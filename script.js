document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  const searchResults = document.getElementById("searchResults");

  // Listen for input changes to fetch results instantly
  searchBox.addEventListener("input", function () {
    let query = searchBox.value.trim();
    if (query.length > 2) {
      fetchSearchResults(query);
    } else {
      searchResults.innerHTML = ""; // Clear results if input is empty
    }
  });

  // Fetch search results from Wikipedia API
  async function fetchSearchResults(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      displayResults(data.query.search, query);
    } catch (error) {
      searchResults.innerHTML = `<p class="text-red-500">Error fetching results. Try again later.</p>`;
    }
  }

  // Display search results
  function displayResults(results, query) {
    searchResults.innerHTML = "";
    if (results.length === 0) {
      searchResults.innerHTML = `<p class="text-gray-500">No results found for "${query}".</p>`;
      return;
    }

    results.forEach((result) => {
      const resultItem = document.createElement("a");
      resultItem.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
      resultItem.target = "_blank";
      resultItem.className = "block p-4 border-b hover:bg-gray-100 dark:hover:bg-gray-800 transition";

      resultItem.innerHTML = `
        <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">${result.title}</h3>
        <p class="text-gray-700 dark:text-gray-300">${result.snippet}...</p>
      `;

      searchResults.appendChild(resultItem);
    });
  }
});
