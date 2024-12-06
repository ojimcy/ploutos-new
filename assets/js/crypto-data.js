async function fetchCryptoData() {
  try {
    // Fetch data from CoinGecko API
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en"
    );
    const data = await response.json();

    // Select the table body
    const tableBody = document.getElementById("crypto-table-body");
    tableBody.innerHTML = "";

    // Populate the table with fetched data
    data.forEach((coin) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>
            <img src="${coin.image}" alt="${
        coin.name
      }" width="25" style="margin-right: 10px;" />
            <span>${coin.symbol.toUpperCase()}</span>
            <br />
            <small>${formatMarketCap(coin.market_cap)}</small>
          </td>
          <td>$${coin.current_price.toLocaleString()}</td>
          <td>${coin.total_volume.toLocaleString()}</td>
          <td class="${
            coin.price_change_percentage_1h_in_currency > 0
              ? "text-success"
              : "text-danger"
          }">
            ${coin.price_change_percentage_1h_in_currency?.toFixed(2) || 0}%
          </td>
          <td class="${
            coin.price_change_percentage_24h_in_currency > 0
              ? "text-success"
              : "text-danger"
          }">
            ${coin.price_change_percentage_24h_in_currency?.toFixed(2) || 0}%
          </td>
          <td class="${
            coin.price_change_percentage_7d_in_currency > 0
              ? "text-success"
              : "text-danger"
          }">
            ${coin.price_change_percentage_7d_in_currency?.toFixed(2) || 0}%
          </td>
        `;
      tableBody.appendChild(row);
    });

    // Update market change summary
    const marketChangeElement = document.getElementById("market-change");
    const totalChange24h = data.reduce(
      (sum, coin) => sum + coin.price_change_percentage_24h_in_currency,
      0
    );
    marketChangeElement.textContent = `${(totalChange24h / data.length).toFixed(
      2
    )}%`;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

// Helper function for formatting market cap
function formatMarketCap(value) {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`; // Trillions
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`; // Billions
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`; // Millions
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`; // Thousands
  return value.toString(); // Less than 1K
}

// Fetch data on page load
fetchCryptoData();
