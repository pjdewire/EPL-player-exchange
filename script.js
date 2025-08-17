class EPETokenExchange {
    constructor() {
        this.userBalance = 50000;
        this.portfolio = {};
        this.currentPlayer = null;
        this.isTrading = false;
        this.currentChart = null;
        this.currentPeriod = '7d';
        
        this.players = [
            {
                id: 1,
                name: "Erling Haaland",
                club: "Manchester City",
                position: "Forward",
                tokenPrice: 125.50,
                availableTokens: 20000,
                priceChange: 5.2,
                marketCap: 2510000,
                volume24h: 850000
            },
            {
                id: 2,
                name: "Mohamed Salah",
                club: "Liverpool",
                position: "Forward",
                tokenPrice: 118.75,
                availableTokens: 20000,
                priceChange: -2.1,
                marketCap: 2375000,
                volume24h: 920000
            },
            {
                id: 3,
                name: "Kevin De Bruyne",
                club: "Manchester City",
                position: "Midfielder",
                tokenPrice: 110.25,
                availableTokens: 20000,
                priceChange: 3.8,
                marketCap: 2205000,
                volume24h: 650000
            },
            {
                id: 4,
                name: "Son Heung-min",
                club: "Tottenham",
                position: "Forward",
                tokenPrice: 95.80,
                availableTokens: 20000,
                priceChange: 1.5,
                marketCap: 1916000,
                volume24h: 780000
            },
            {
                id: 5,
                name: "Virgil van Dijk",
                club: "Liverpool",
                position: "Defender",
                tokenPrice: 88.40,
                availableTokens: 20000,
                priceChange: 2.7,
                marketCap: 1768000,
                volume24h: 420000
            },
            {
                id: 6,
                name: "Bukayo Saka",
                club: "Arsenal",
                position: "Forward",
                tokenPrice: 82.15,
                availableTokens: 20000,
                priceChange: 8.2,
                marketCap: 1643000,
                volume24h: 590000
            },
            {
                id: 7,
                name: "Marcus Rashford",
                club: "Manchester United",
                position: "Forward",
                tokenPrice: 75.90,
                availableTokens: 20000,
                priceChange: -1.8,
                marketCap: 1518000,
                volume24h: 380000
            },
            {
                id: 8,
                name: "Declan Rice",
                club: "Arsenal",
                position: "Midfielder",
                tokenPrice: 68.25,
                availableTokens: 20000,
                priceChange: 4.1,
                marketCap: 1365000,
                volume24h: 310000
            },
            {
                id: 9,
                name: "Bruno Fernandes",
                club: "Manchester United",
                position: "Midfielder",
                tokenPrice: 72.40,
                availableTokens: 20000,
                priceChange: 2.3,
                marketCap: 1448000,
                volume24h: 440000
            },
            {
                id: 10,
                name: "Cole Palmer",
                club: "Chelsea",
                position: "Midfielder",
                tokenPrice: 65.80,
                availableTokens: 20000,
                priceChange: 12.5,
                marketCap: 1316000,
                volume24h: 720000
            },
            {
                id: 11,
                name: "Martin Ødegaard",
                club: "Arsenal",
                position: "Midfielder",
                tokenPrice: 78.30,
                availableTokens: 20000,
                priceChange: 3.7,
                marketCap: 1566000,
                volume24h: 390000
            },
            {
                id: 12,
                name: "Alexander Isak",
                club: "Newcastle United",
                position: "Forward",
                tokenPrice: 71.60,
                availableTokens: 20000,
                priceChange: 6.8,
                marketCap: 1432000,
                volume24h: 480000
            }
        ];
        
        this.generateHistoricalData();
        this.generatePayoutData();
        this.init();
    }
    
    generateHistoricalData() {
        this.players.forEach(player => {
            player.priceHistory = this.generatePriceHistory(player.tokenPrice);
        });
    }
    
    generatePriceHistory(currentPrice) {
        const history = {
            '7d': [],
            '30d': [],
            '90d': [],
            '1y': []
        };
        
        const periods = {
            '7d': { days: 7, interval: 6 },
            '30d': { days: 30, interval: 2 },
            '90d': { days: 90, interval: 3 },
            '1y': { days: 365, interval: 14 }
        };
        
        Object.keys(periods).forEach(period => {
            const { days, interval } = periods[period];
            let price = currentPrice * (0.7 + Math.random() * 0.6);
            
            for (let i = days; i >= 0; i -= interval) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                
                const volatility = 0.05;
                const change = (Math.random() - 0.5) * volatility;
                price = Math.max(10, price * (1 + change));
                
                if (i === 0) price = currentPrice;
                
                history[period].push({
                    date: date.toISOString().split('T')[0],
                    price: parseFloat(price.toFixed(2))
                });
            }
        });
        
        return history;
    }
    
    generatePayoutData() {
        this.players.forEach(player => {
            player.payouts = this.generatePayouts(player);
        });
    }
    
    generatePayouts(player) {
        const payouts = [];
        const payoutTypes = [
            { type: 'Transfer Fee', weight: 0.1, baseAmount: player.tokenPrice * 0.5 },
            { type: 'Merchandise', weight: 0.4, baseAmount: player.tokenPrice * 0.15 },
            { type: 'Sponsorship', weight: 0.3, baseAmount: player.tokenPrice * 0.25 },
            { type: 'Image Rights', weight: 0.2, baseAmount: player.tokenPrice * 0.1 }
        ];
        
        for (let i = 12; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            
            payoutTypes.forEach(payout => {
                if (Math.random() < payout.weight) {
                    const amount = payout.baseAmount * (0.5 + Math.random());
                    const perToken = amount / 20000;
                    
                    payouts.push({
                        date: date.toISOString().split('T')[0],
                        type: payout.type,
                        totalAmount: parseFloat(amount.toFixed(2)),
                        perToken: parseFloat(perToken.toFixed(4)),
                        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    });
                }
            });
        }
        
        return payouts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    init() {
        this.renderPlayers();
        this.setupEventListeners();
        this.updateUserBalance();
        this.simulateMarketMovement();
    }
    
    renderPlayers() {
        const container = document.getElementById('players-container');
        container.innerHTML = '';
        
        this.players.forEach(player => {
            const playerCard = this.createPlayerCard(player);
            container.appendChild(playerCard);
        });
    }
    
    createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.onclick = () => this.openTradingModal(player);
        
        const initials = player.name.split(' ').map(n => n[0]).join('');
        const priceChangeClass = player.priceChange >= 0 ? 'positive' : 'negative';
        const priceChangeSymbol = player.priceChange >= 0 ? '+' : '';
        
        card.innerHTML = `
            <div class="player-header">
                <div class="player-avatar">${initials}</div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <p>${player.club} • ${player.position}</p>
                </div>
            </div>
            <div class="player-stats">
                <div class="stat-item">
                    <span class="label">Token Price</span>
                    <span class="value">$${player.tokenPrice.toFixed(2)}</span>
                </div>
                <div class="stat-item">
                    <span class="label">24h Change</span>
                    <span class="value price-change ${priceChangeClass}">
                        ${priceChangeSymbol}${player.priceChange.toFixed(1)}%
                    </span>
                </div>
                <div class="stat-item">
                    <span class="label">Available</span>
                    <span class="value">${player.availableTokens.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="label">Market Cap</span>
                    <span class="value">$${(player.marketCap / 1000000).toFixed(1)}M</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    openTradingModal(player) {
        this.currentPlayer = player;
        const modal = document.getElementById('trading-modal');
        
        document.getElementById('modal-player-name').textContent = player.name;
        document.getElementById('modal-player-club').textContent = player.club;
        document.getElementById('modal-player-position').textContent = player.position;
        document.getElementById('modal-token-price').textContent = player.tokenPrice.toFixed(2);
        document.getElementById('modal-available-tokens').textContent = player.availableTokens.toLocaleString();
        
        const playerImage = document.getElementById('modal-player-image');
        playerImage.style.background = '#667eea';
        playerImage.style.width = '100px';
        playerImage.style.height = '100px';
        playerImage.style.borderRadius = '50%';
        playerImage.style.display = 'flex';
        playerImage.style.alignItems = 'center';
        playerImage.style.justifyContent = 'center';
        playerImage.style.color = 'white';
        playerImage.style.fontWeight = 'bold';
        playerImage.style.fontSize = '1.5rem';
        playerImage.textContent = player.name.split(' ').map(n => n[0]).join('');
        
        this.updatePayoutData(player);
        modal.style.display = 'block';
        this.updateTradeCalculation();
    }
    
    setupEventListeners() {
        const modal = document.getElementById('trading-modal');
        const closeBtn = document.querySelector('.close');
        const buyBtn = document.getElementById('buy-btn');
        const sellBtn = document.getElementById('sell-btn');
        const quantityInput = document.getElementById('token-quantity');
        const executeBtn = document.getElementById('execute-trade');
        
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            if (this.currentChart) {
                this.currentChart.destroy();
                this.currentChart = null;
            }
        };
        
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                if (this.currentChart) {
                    this.currentChart.destroy();
                    this.currentChart = null;
                }
            }
        };
        
        buyBtn.onclick = () => {
            buyBtn.classList.add('active');
            sellBtn.classList.remove('active');
            executeBtn.textContent = 'Buy Tokens';
            this.isTrading = false;
            this.updateTradeCalculation();
        };
        
        sellBtn.onclick = () => {
            sellBtn.classList.add('active');
            buyBtn.classList.remove('active');
            executeBtn.textContent = 'Sell Tokens';
            this.isTrading = true;
            this.updateTradeCalculation();
        };
        
        quantityInput.addEventListener('input', () => {
            this.updateTradeCalculation();
        });
        
        executeBtn.onclick = () => {
            this.executeTrade();
        };
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        document.querySelectorAll('.chart-period').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                this.updateChartPeriod(period);
            });
        });
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        if (tabName === 'chart') {
            setTimeout(() => this.renderChart(), 100);
        }
    }
    
    renderChart() {
        const canvas = document.getElementById('price-chart');
        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        const data = this.currentPlayer.priceHistory[this.currentPeriod];
        
        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(point => {
                    const date = new Date(point.date);
                    return date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                    });
                }),
                datasets: [{
                    label: 'Token Price',
                    data: data.map(point => point.price),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(0);
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    updateChartPeriod(period) {
        this.currentPeriod = period;
        
        document.querySelectorAll('.chart-period').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        
        if (this.currentChart) {
            this.renderChart();
        }
    }
    
    updatePayoutData(player) {
        const payouts = player.payouts;
        const totalPayouts = payouts.reduce((sum, payout) => sum + payout.totalAmount, 0);
        const lastPayout = payouts.length > 0 ? payouts[0] : null;
        const annualYield = ((totalPayouts / 20000) / player.tokenPrice) * 100;
        
        document.getElementById('total-payouts').textContent = `$${totalPayouts.toFixed(2)}`;
        document.getElementById('last-payout').textContent = lastPayout ? `$${lastPayout.totalAmount.toFixed(2)}` : '$0';
        document.getElementById('annual-yield').textContent = `${annualYield.toFixed(1)}%`;
        
        const payoutList = document.getElementById('payout-list');
        payoutList.innerHTML = '';
        
        payouts.slice(0, 10).forEach(payout => {
            const item = document.createElement('div');
            item.className = 'payout-item';
            item.innerHTML = `
                <div>
                    <div class="payout-type">${payout.type}</div>
                    <div class="payout-date">${payout.month}</div>
                </div>
                <div style="text-align: right;">
                    <div class="payout-amount">$${payout.totalAmount.toFixed(2)}</div>
                    <div class="payout-per-token">$${payout.perToken.toFixed(4)}/token</div>
                </div>
            `;
            payoutList.appendChild(item);
        });
    }
    
    updateTradeCalculation() {
        const quantity = parseInt(document.getElementById('token-quantity').value) || 0;
        const totalCost = quantity * this.currentPlayer.tokenPrice;
        document.getElementById('total-cost').textContent = totalCost.toFixed(2);
    }
    
    executeTrade() {
        const quantity = parseInt(document.getElementById('token-quantity').value);
        const player = this.currentPlayer;
        const totalCost = quantity * player.tokenPrice;
        
        if (!quantity || quantity <= 0) {
            alert('Please enter a valid quantity');
            return;
        }
        
        if (this.isTrading) {
            const owned = this.portfolio[player.id]?.quantity || 0;
            if (quantity > owned) {
                alert('You don\'t own enough tokens to sell');
                return;
            }
            
            this.userBalance += totalCost;
            this.portfolio[player.id].quantity -= quantity;
            if (this.portfolio[player.id].quantity === 0) {
                delete this.portfolio[player.id];
            }
            
            const playerData = this.players.find(p => p.id === player.id);
            playerData.availableTokens += quantity;
            
            alert(`Successfully sold ${quantity} tokens for $${totalCost.toFixed(2)}`);
        } else {
            if (totalCost > this.userBalance) {
                alert('Insufficient balance');
                return;
            }
            
            if (quantity > player.availableTokens) {
                alert('Not enough tokens available');
                return;
            }
            
            this.userBalance -= totalCost;
            
            if (!this.portfolio[player.id]) {
                this.portfolio[player.id] = {
                    player: player,
                    quantity: 0,
                    avgPrice: 0
                };
            }
            
            const currentOwned = this.portfolio[player.id].quantity;
            const currentAvgPrice = this.portfolio[player.id].avgPrice;
            const newAvgPrice = (currentOwned * currentAvgPrice + quantity * player.tokenPrice) / (currentOwned + quantity);
            
            this.portfolio[player.id].quantity += quantity;
            this.portfolio[player.id].avgPrice = newAvgPrice;
            
            const playerData = this.players.find(p => p.id === player.id);
            playerData.availableTokens -= quantity;
            
            alert(`Successfully purchased ${quantity} tokens for $${totalCost.toFixed(2)}`);
        }
        
        this.updateUserBalance();
        this.updatePortfolio();
        this.renderPlayers();
        document.getElementById('trading-modal').style.display = 'none';
        document.getElementById('token-quantity').value = '';
        
        if (this.currentChart) {
            this.currentChart.destroy();
            this.currentChart = null;
        }
    }
    
    updateUserBalance() {
        document.getElementById('user-balance').textContent = this.userBalance.toFixed(2);
    }
    
    updatePortfolio() {
        const container = document.getElementById('portfolio-container');
        
        if (Object.keys(this.portfolio).length === 0) {
            container.innerHTML = '<p>No tokens owned yet. Start trading to build your portfolio!</p>';
            return;
        }
        
        let html = '';
        Object.values(this.portfolio).forEach(holding => {
            const currentValue = holding.quantity * holding.player.tokenPrice;
            const totalInvested = holding.quantity * holding.avgPrice;
            const profitLoss = currentValue - totalInvested;
            const profitLossPercent = (profitLoss / totalInvested) * 100;
            const profitLossClass = profitLoss >= 0 ? 'positive' : 'negative';
            
            html += `
                <div class="portfolio-item">
                    <div class="portfolio-info">
                        <h4>${holding.player.name}</h4>
                        <p>${holding.quantity} tokens @ avg $${holding.avgPrice.toFixed(2)}</p>
                    </div>
                    <div class="portfolio-value">
                        <div class="tokens">$${currentValue.toFixed(2)}</div>
                        <div class="value price-change ${profitLossClass}">
                            ${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)} (${profitLossPercent.toFixed(1)}%)
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    simulateMarketMovement() {
        setInterval(() => {
            this.players.forEach(player => {
                const volatility = 0.02;
                const change = (Math.random() - 0.5) * volatility;
                const newPrice = player.tokenPrice * (1 + change);
                
                player.priceChange = ((newPrice - player.tokenPrice) / player.tokenPrice) * 100;
                player.tokenPrice = Math.max(1, newPrice);
                player.marketCap = player.tokenPrice * 20000;
                player.volume24h = Math.max(100000, player.volume24h * (0.9 + Math.random() * 0.2));
            });
            
            this.renderPlayers();
            this.updatePortfolio();
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EPETokenExchange();
});