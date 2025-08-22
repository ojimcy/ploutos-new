// Virtual Card Sales Data Management
class VirtualCardTracker {
    constructor() {
        this.isInitialized = false;
        this.animationIntervals = [];
        this.currentStats = {
            totalCards: 12450
        };
    }

    // Initialize the virtual card tracker
    init() {
        if (this.isInitialized) return;

        try {
            this.updateStatsDisplay();
            this.startRealTimeUpdates();
            this.isInitialized = true;
            console.log('Virtual Card Tracker initialized successfully');
        } catch (error) {
            console.error('Error initializing Virtual Card Tracker:', error);
        }
    }

    // Update the main statistics display
    updateStatsDisplay() {
        const totalCardsElement = document.getElementById('total-cards-sold');

        // Update only the total cards sold
        if (totalCardsElement) {
            totalCardsElement.textContent = this.formatNumber(this.currentStats.totalCards);
        }
    }

    // Format numbers with K/M suffixes
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    }

    // Start real-time updates
    startRealTimeUpdates() {
        // Update stats every 30 seconds
        const updateStatsInterval = setInterval(() => {
            this.simulateStatUpdates();
            this.updateStatsDisplay();
        }, 30000);

        this.animationIntervals.push(updateStatsInterval);
    }

    // Simulate realistic stat updates
    simulateStatUpdates() {
        // Small incremental changes to make it feel real - only update total cards
        const increment = Math.floor(Math.random() * 3) + 1;
        this.currentStats.totalCards += increment;
    }

    // Stop all intervals (cleanup)
    destroy() {
        this.animationIntervals.forEach(interval => clearInterval(interval));
        this.animationIntervals = [];
        this.isInitialized = false;
    }
}

// Global instance
let virtualCardTracker;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize with a small delay to ensure all elements are loaded
    setTimeout(() => {
        virtualCardTracker = new VirtualCardTracker();
        virtualCardTracker.init();
    }, 1000);
});

// Animate stats on scroll into view
function animateStatsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsBox = entry.target.querySelector('.virtual-card-simple-stats');
                if (statsBox) {
                    setTimeout(() => {
                        statsBox.style.transform = 'translateY(0)';
                        statsBox.style.opacity = '1';
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const virtualCardSection = document.querySelector('.virtual-card-section');
    if (virtualCardSection) {
        observer.observe(virtualCardSection);
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateStatsOnScroll);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VirtualCardTracker;
}