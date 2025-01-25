// document.addEventListener('DOMContentLoaded', () => {
//   const authForm = document.getElementById('auth-form');
//   const phoneNumberInput = document.getElementById('phone-number');
//   const landingPage = document.getElementById('landing-page');
//   const mainPage = document.getElementById('main-page');

//   authForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const phoneNumber = phoneNumberInput.value.trim(); // Trim extra spaces
//     const phoneNumberPattern = /^[0-9]{10}$/; // Adjust as per your phone number format

//     if (phoneNumberPattern.test(phoneNumber)) {
//       // Show alert for successful authentication
//       alert('Authentication successful!');

//       // Hide landing page and show main page after authentication
//       landingPage.classList.add('hidden'); // Hide landing page
//       mainPage.classList.remove('hidden'); // Show main page
//     } else {
//       // Show alert for invalid phone number
//       alert('Please enter a valid 10-digit phone number.');
//     }
//   });

//   // Smooth Scroll Navigation
//   document.querySelectorAll('.nav-links a').forEach(link => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       const targetId = link.getAttribute('href').substring(1);
//       const targetSection = document.getElementById(targetId);

//       if (targetSection) {
//         targetSection.scrollIntoView({ behavior: 'smooth' });
//       }
//     });
//   });
// });


document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.getElementById('auth-form');
  const phoneNumberInput = document.getElementById('phone-number');
  const landingPage = document.getElementById('landing-page');
  const mainPage = document.getElementById('main-page');

  // Authentication Form Submit
  authForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const phoneNumber = phoneNumberInput.value.trim(); // Trim extra spaces
    const phoneNumberPattern = /^[0-9]{10}$/; // Adjust as per your phone number format

    if (phoneNumberPattern.test(phoneNumber)) {
      // Show alert for successful authentication
      alert('Authentication successful!');

      // Hide landing page and show main page after authentication
      landingPage.style.display = 'none'; // Hide landing page
      mainPage.style.display = 'block'; // Show main page
    } else {
      // Show alert for invalid phone number
      alert('Please enter a valid 10-digit phone number.');
    }
  });

  // Smooth Scroll Navigation
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
// src/main.js

/*async function searchStock() {
  const symbol = document.getElementById('stock-symbol').value;
  if (!symbol) {
      alert('Please enter a stock symbol!');
      return;
  }

  const apiKey = '5GVOC8QTZZ6T5NP3'; // Your Alpha Vantage API key
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data["Error Message"]) {
          alert('Invalid stock symbol or issue with API.');
          return;
      }

      displayStockData(data);
  } catch (error) {
      console.error('Error fetching stock data:', error);
      alert('Error fetching stock data.');
  }
}

function displayStockData(data) {
  const stockInfoDiv = document.getElementById('stock-info');
  stockInfoDiv.innerHTML = ''; // Clear previous data

  const stockSymbol = data["Meta Data"]["2. Symbol"];
  const timeSeries = data["Time Series (Daily)"];

  let content = `<h3>Stock Data for ${stockSymbol}</h3><ul>`;
  
  // Displaying the latest 5 days data
  let count = 0;
  for (const date in timeSeries) {
      if (count === 5) break; // Limit to 5 days
      const dailyData = timeSeries[date];
      content += `
          <li class="stock-data">
              <strong>Date:</strong> ${date}<br>
              <strong>Open:</strong> ${dailyData["1. open"]} <br>
              <strong>High:</strong> ${dailyData["2. high"]} <br>
              <strong>Low:</strong> ${dailyData["3. low"]} <br>
              <strong>Close:</strong> ${dailyData["4. close"]} <br>
              <strong>Volume:</strong> ${dailyData["5. volume"]} <br>
          </li>
      `;
      count++;
  }

  content += '</ul>';
  stockInfoDiv.innerHTML = content;
}*/
async function searchStock() {
  const symbol = document.getElementById('stock-symbol').value;
  if (!symbol) {
      alert('Please enter a stock symbol!');
      return;
  }

  const apiKey = '5GVOC8QTZZ6T5NP3'; // Your Alpha Vantage API key
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data["Error Message"]) {
          alert('Invalid stock symbol or issue with API.');
          return;
      }

      displayStockData(data);
      plotStockGraph(data);
  } catch (error) {
      console.error('Error fetching stock data:', error);
      alert('Error fetching stock data.');
  }
}
function displayStockData(data) {
  const stockInfoDiv = document.getElementById('stock-info');
  stockInfoDiv.innerHTML = ''; // Clear previous data

  const stockSymbol = data["Meta Data"]["2. Symbol"];
  const timeSeries = data["Time Series (Daily)"];

  let content = `<h3>Stock Data for ${stockSymbol}</h3>`;

  // Create table structure
  content += `
      <table class="stock-data-table">
          <thead>
              <tr>
                  <th>Date</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Volume</th>
              </tr>
          </thead>
          <tbody>
  `;

  // Displaying the latest 7 days data
  let count = 0;
  for (const date in timeSeries) {
      if (count === 7) break; // Limit to 7 days
      const dailyData = timeSeries[date];
      content += `
          <tr>
              <td>${date}</td>
              <td>${dailyData["1. open"]}</td>
              <td>${dailyData["2. high"]}</td>
              <td>${dailyData["3. low"]}</td>
              <td>${dailyData["4. close"]}</td>
              <td>${dailyData["5. volume"]}</td>
          </tr>
      `;
      count++;
  }

  content += '</tbody></table>';
  stockInfoDiv.innerHTML = content;
}


/*function displayStockData(data) {
  const stockInfoDiv = document.getElementById('stock-info');
  stockInfoDiv.innerHTML = ''; // Clear previous data

  const stockSymbol = data["Meta Data"]["2. Symbol"];
  const timeSeries = data["Time Series (Daily)"];

  let content = `<h3>Stock Data for ${stockSymbol}</h3><ul>`;

  // Displaying the latest 7 days data
  let count = 0;
  for (const date in timeSeries) {
      if (count === 7) break; // Limit to 7 days
      const dailyData = timeSeries[date];
      content += `
          <li class="stock-data">
              <strong>Date:</strong> ${date}<br>
              <strong>Open:</strong> ${dailyData["1. open"]} <br>
              <strong>High:</strong> ${dailyData["2. high"]} <br>
              <strong>Low:</strong> ${dailyData["3. low"]} <br>
              <strong>Close:</strong> ${dailyData["4. close"]} <br>
              <strong>Volume:</strong> ${dailyData["5. volume"]} <br>
          </li>
      `;
      count++;
  }

  content += '</ul>';
  stockInfoDiv.innerHTML = content;
}
*/

function plotStockGraph(data) {
  const stockSymbol = data["Meta Data"]["2. Symbol"];
  const timeSeries = data["Time Series (Daily)"];
  const dates = [];
  const closingPrices = [];

  let count = 0;
  for (const date in timeSeries) {
      if (count === 7) break; // Limit to 7 days
      const dailyData = timeSeries[date];
      dates.push(date);
      closingPrices.push(dailyData["4. close"]);
      count++;
  }

  // Create the graph using Chart.js
  const ctx = document.getElementById('stock-chart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: dates.reverse(), // Reverse to show latest date first
          datasets: [{
              label: `Stock Price (Closing) - ${stockSymbol}`,
              data: closingPrices.reverse(),
              fill: false,
              borderColor: '#007bff',
              tension: 0.1
          }]
      },
      options: {
          responsive: true,
          plugins: {
              title: {
                  display: true,
                  text: `Stock Price for ${stockSymbol} (Last 7 Days)`
              }
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Date'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Price (USD)'
                  }
              }
          }
      }
  });
}
/*
async function fetchTopGainersAndLosers() {
  const apiKey = '5GVOC8QTZZ6T5NP3'; // Your Alpha Vantage API key
  const topStocks = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'NFLX', 'FB']; // Example stock symbols for demonstration
  const gainers = [];
  const losers = [];

  for (const symbol of topStocks) {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

      try {
          const response = await fetch(url);
          const data = await response.json();

          if (data["Error Message"]) {
              console.error(`Error with symbol ${symbol}: Invalid symbol or API issue.`);
              continue;
          }

          const timeSeries = data["Time Series (Daily)"];
          const dates = Object.keys(timeSeries);
          const latestDate = dates[0];
          const previousDate = dates[1];

          const latestClose = parseFloat(timeSeries[latestDate]["4. close"]);
          const previousClose = parseFloat(timeSeries[previousDate]["4. close"]);
          const changePercent = ((latestClose - previousClose) / previousClose) * 100;

          // Categorize as Gainer or Loser
          if (changePercent > 0) {
              gainers.push({ symbol, changePercent });
          } else {
              losers.push({ symbol, changePercent });
          }

      } catch (error) {
          console.error('Error fetching stock data:', error);
      }
  }

  // Sort by percentage change
  gainers.sort((a, b) => b.changePercent - a.changePercent);
  losers.sort((a, b) => a.changePercent - b.changePercent);

  // Display the data
  displayTopStocks(gainers, 'Top Gainers');
  displayTopStocks(losers, 'Top Losers');
}

function displayTopStocks(stocks, title) {
  const stockDataDiv = document.getElementById('stock-data');
  let content = `<h3>${title}</h3><table class="stock-data-table"><thead><tr><th>Stock Symbol</th><th>Percentage Change</th></tr></thead><tbody>`;

  stocks.slice(0, 5).forEach(stock => {  // Show top 5
      content += `
          <tr>
              <td>${stock.symbol}</td>
              <td>${stock.changePercent.toFixed(2)}%</td>
          </tr>
      `;
  });

  content += '</tbody></table>';
  stockDataDiv.innerHTML = content;
}
*/
// Hardcoded top gainers and losers data
/*function displayTopStocks() {
  const gainers = [
      { symbol: 'AAPL', changePercent: 3.5 },
      { symbol: 'TSLA', changePercent: 2.8 },
      { symbol: 'AMZN', changePercent: 2.2 },
      { symbol: 'GOOGL', changePercent: 1.7 },
      { symbol: 'MSFT', changePercent: 1.5 }
  ];

  const losers = [
      { symbol: 'NFLX', changePercent: -2.5 },
      { symbol: 'FB', changePercent: -3.0 },
      { symbol: 'BA', changePercent: -1.8 },
      { symbol: 'GE', changePercent: -1.6 },
      { symbol: 'IBM', changePercent: -1.2 }
  ];

  displayStocksTable(gainers, 'Top Gainers');
  displayStocksTable(losers, 'Top Losers');
}

function displayStocksTable(stocks, title) {
  const stockDataDiv = document.getElementById('stock-data');
  let content = `<h3>${title}</h3><table class="stock-data-table"><thead><tr><th>Stock Symbol</th><th>Percentage Change</th></tr></thead><tbody>`;

  stocks.forEach(stock => {
      content += `
          <tr>
              <td>${stock.symbol}</td>
              <td>${stock.changePercent.toFixed(2)}%</td>
          </tr>
      `;
  });

  content += '</tbody></table>';
  stockDataDiv.innerHTML = content;
}*/
// Hardcoded top gainers and losers data
/*function displayTopStocks() {
  const gainers = [
      { symbol: 'AAPL', changePercent: 3.5 },
      { symbol: 'TSLA', changePercent: 2.8 },
      { symbol: 'AMZN', changePercent: 2.2 },
      { symbol: 'GOOGL', changePercent: 1.7 },
      { symbol: 'MSFT', changePercent: 1.5 }
  ];

  const losers = [
      { symbol: 'NFLX', changePercent: -2.5 },
      { symbol: 'FB', changePercent: -3.0 },
      { symbol: 'BA', changePercent: -1.8 },
      { symbol: 'GE', changePercent: -1.6 },
      { symbol: 'IBM', changePercent: -1.2 }
  ];

  // Display the Top Gainers and Losers in their respective div elements
  displayStocksTable(gainers, 'Top Gainers', 'gainers');
  displayStocksTable(losers, 'Top Losers', 'losers');
}

function displayStocksTable(stocks, title, containerId) {
  const stockDataDiv = document.getElementById(containerId);
  let content = `<h3>${title}</h3><table class="stock-data-table"><thead><tr><th>Stock Symbol</th><th>Percentage Change</th></tr></thead><tbody>`;

  stocks.forEach(stock => {
      content += `
          <tr>
              <td>${stock.symbol}</td>
              <td>${stock.changePercent.toFixed(2)}%</td>
          </tr>
      `;
  });

  content += '</tbody></table>';
  stockDataDiv.innerHTML = content;
}
const apiKey = '5GVOC8QTZZ6T5NP3'; // Your API key from Alpha Vantage

async function getTopStocks() {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data['Error Message']) {
            console.error('Error fetching data:', data['Error Message']);
            return;
        }
        
        // Extract top gainers, losers, and active tickers
        const gainers = data['Top Gainers'];
        const losers = data['Top Losers'];
        const active = data['Most Active'];

        // Display the data
        displayTopStocks(gainers, losers, active);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayTopStocks(gainers, losers, active) {
    const gainersContainer = document.getElementById('top-gainers');
    const losersContainer = document.getElementById('top-losers');
    const activeContainer = document.getElementById('most-active');

    gainersContainer.innerHTML = '';
    losersContainer.innerHTML = '';
    activeContainer.innerHTML = '';

    gainers.forEach(stock => {
        gainersContainer.innerHTML += `
            <div class="stock-card">
                <h4>${stock['symbol']}</h4>
                <p>Change: ${stock['percentage_change']}%</p>
            </div>
        `;
    });

    losers.forEach(stock => {
        losersContainer.innerHTML += `
            <div class="stock-card">
                <h4>${stock['symbol']}</h4>
                <p>Change: ${stock['percentage_change']}%</p>
            </div>
        `;
    });

    active.forEach(stock => {
        activeContainer.innerHTML += `
            <div class="stock-card">
                <h4>${stock['symbol']}</h4>
                <p>Volume: ${stock['volume']}</p>
            </div>
        `;
    });
}
getTopStocks();*/
document.addEventListener("DOMContentLoaded", () => {
  // Hardcoded data for top gainers and losers
  const topGainers = [
      { symbol: "TCS", percentage_change: "3.45%" },
      { symbol: "INFY", percentage_change: "2.78%" },
      { symbol: "HDFCBANK", percentage_change: "2.35%" },
      { symbol: "RELIANCE", percentage_change: "1.95%" },
      { symbol: "HINDUNILVR", percentage_change: "1.60%" }
  ];

  const topLosers = [
      { symbol: "YESBANK", percentage_change: "-4.12%" },
      { symbol: "PNB", percentage_change: "-3.76%" },
      { symbol: "BANKBARODA", percentage_change: "-3.56%" },
      { symbol: "INDIACEM", percentage_change: "-2.87%" },
      { symbol: "HCLTECH", percentage_change: "-2.35%" }
  ];

  // Function to display stock data dynamically as cards
  function displayTopStocks(gainers, losers) {
      const gainersContainer = document.getElementById('top-gainers');
      const losersContainer = document.getElementById('top-losers');

      // Clear previous content
      gainersContainer.innerHTML = '';
      losersContainer.innerHTML = '';

      // Display top gainers
      gainers.forEach(stock => {
          gainersContainer.innerHTML += `
              <div class="stock-card">
                  <h4>${stock.symbol}</h4>
                  <p>Change: ${stock.percentage_change}</p>
              </div>
          `;
      });

      // Display top losers
      losers.forEach(stock => {
          losersContainer.innerHTML += `
              <div class="stock-card">
                  <h4>${stock.symbol}</h4>
                  <p>Change: ${stock.percentage_change}</p>
              </div>
          `;
      });
  }

  // Call the function with hardcoded data
  displayTopStocks(topGainers, topLosers);
});

const apiKey = '5GVOC8QTZZ6T5NP3';  // Your Alpha Vantage API key

// Function to fetch Forex data
async function fetchForexData() {
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const exchangeRate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        document.getElementById('forex-info').textContent = `USD to EUR: ${exchangeRate}`;
    } catch (error) {
        console.error('Error fetching Forex data:', error);
        document.getElementById('forex-info').textContent = 'Error loading data.';
    }
}

// Function to fetch Cryptocurrency data
async function fetchCryptoData() {
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const cryptoPrice = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        document.getElementById('crypto-info').textContent = `Bitcoin (BTC) to USD: $${cryptoPrice}`;
    } catch (error) {
        console.error('Error fetching Cryptocurrency data:', error);
        document.getElementById('crypto-info').textContent = 'Error loading data.';
    }
}

// Function to fetch Commodities data (Oil price)
async function fetchCommoditiesData() {
    const url = `https://www.alphavantage.co/query?function=COMMODITY_PRICES&symbol=OIL&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const oilPrice = data['Commodity Prices'][0]['price'];
        document.getElementById('commodities-info').textContent = `Oil Price: $${oilPrice}`;
    } catch (error) {
        console.error('Error fetching Commodities data:', error);
        document.getElementById('commodities-info').textContent = 'Error loading data.';
    }
}

// Function to fetch Economic Indicators data (Real GDP)
async function fetchEconomicData() {
    const url = `https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const gdp = data['Real GDP'][0]['value'];
        document.getElementById('economic-info').textContent = `Real GDP: $${gdp} trillion`;
    } catch (error) {
        console.error('Error fetching Economic data:', error);
        document.getElementById('economic-info').textContent = 'Error loading data.';
    }
}

// Fetch all the data when the page loads
fetchForexData();
fetchCryptoData();
fetchCommoditiesData();
fetchEconomicData();








