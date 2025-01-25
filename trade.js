const portfolio = {}; // To store quantity and buying price
const priceHistory = {}; // To track price trends
const maxPrice = 500;
const minPrice = 50;

// Function to generate a random price
const getRandomPrice = () => (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);

// Function to calculate profit/loss
const calculateProfit = (symbol, quantity, buyPrice, currentPrice) => {
  const totalBuyPrice = buyPrice * quantity;
  const totalCurrentPrice = currentPrice * quantity;
  return totalCurrentPrice - totalBuyPrice; // Profit = Current Value - Buy Value
};

// Function to update portfolio chart
const updatePortfolioChart = () => {
  const ctx = document.getElementById("portfolio-chart").getContext("2d");
  const labels = Object.keys(portfolio);
  const data = Object.values(portfolio).map(stock => stock.quantity);

  if (window.portfolioChart) window.portfolioChart.destroy();
  window.portfolioChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
};

// Function to display trade messages
const displayMessage = (message, isError = false) => {
  const messageDiv = document.getElementById("trade-message");
  messageDiv.textContent = message;
  messageDiv.style.color = isError ? "red" : "green";
  messageDiv.classList.remove("hidden");
};

// Function to handle trades
const handleTrade = (action) => {
  const symbol = document.getElementById("stock-symbol").value.toUpperCase();
  const quantity = parseInt(document.getElementById("quantity").value, 10);

  if (!symbol || quantity <= 0) {
    displayMessage("Please enter a valid stock symbol and quantity.", true);
    return;
  }

  const price = getRandomPrice();

  if (action === "buy") {
    if (!portfolio[symbol]) portfolio[symbol] = { quantity: 0, buyPrice: 0 };
    portfolio[symbol].quantity += quantity;

    // For buying, store the price when first bought
    if (portfolio[symbol].buyPrice === 0) portfolio[symbol].buyPrice = price;

    priceHistory[symbol] = priceHistory[symbol] || [];
    priceHistory[symbol].push(price);

    displayMessage(`Bought ${quantity} shares of ${symbol} at $${price} per share.`);
  } else if (action === "sell") {
    if (!portfolio[symbol] || portfolio[symbol].quantity < quantity) {
      displayMessage(`Insufficient shares of ${symbol} to sell.`, true);
      return;
    }
    const buyPrice = portfolio[symbol].buyPrice;
    portfolio[symbol].quantity -= quantity;

    // Calculate profit for the stock being sold
    const profit = calculateProfit(symbol, quantity, buyPrice, price);
    displayMessage(`Sold ${quantity} shares of ${symbol} at $${price} per share. Profit: $${profit.toFixed(2)}`);
  }

  updatePortfolio();
};

// Function to update portfolio display
const updatePortfolio = () => {
  const portfolioList = document.getElementById("portfolio-list");
  const portfolioSummary = document.getElementById("portfolio-summary");
  portfolioList.innerHTML = "";

  let totalPortfolioValue = 0;
  let totalProfit = 0;

  // Loop through portfolio to calculate total value and profit
  for (const [symbol, stock] of Object.entries(portfolio)) {
    if (stock.quantity > 0) {
      const currentPrice = getRandomPrice();
      const profit = calculateProfit(symbol, stock.quantity, stock.buyPrice, currentPrice);
      totalProfit += profit;

      portfolioList.innerHTML += `
        <li>${symbol}: ${stock.quantity} shares | Profit/Loss: $${profit.toFixed(2)}</li>
      `;
      totalPortfolioValue += currentPrice * stock.quantity;
    }
  }

  portfolioSummary.innerHTML = `
    Total Portfolio Value: $${totalPortfolioValue.toFixed(2)} <br>
    Total Profit/Loss: $${totalProfit.toFixed(2)}
  `;

  updatePortfolioChart();
};

// Event listeners for buy and sell buttons
document.getElementById("buy-stock").addEventListener("click", () => handleTrade("buy"));
document.getElementById("sell-stock").addEventListener("click", () => handleTrade("sell"));
