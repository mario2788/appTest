

class AnomalyDetector {

    constructor(thresholds = {}) {

        this.thresholds = {
            maxRequestsPerMinute: thresholds.maxRequestsPerMinute || 100,
            maxFailedLogins: thresholds.maxFailedLogins || 5,
            responseTimeThreshold: thresholds.responseTimeThreshold || 10000, // ms
            errorRateThreshold: thresholds.errorRateThreshold || 0.05 // 5%
        };

        this.metrics = {
            requestCounts: new Map(),
            failedLogins: new Map(),
            responseTimes: [],
            errors: 0,
            total: 0
        };
    }

    checkRequestRate(ip) {
        const now = Date.now();
        const minute = Math.floor(now / 60000);
        const key = `${ip}-${minute}`;
        const count = (this.metrics.requestCounts.get(key) || 0) + 1;
        this.metrics.requestCounts.set(key, count);

        return count > this.thresholds.maxRequestsPerMinute;
    }

    checkFailedLogins(userId) {
        const count = (this.metrics.failedLogins.get(userId) || 0) + 1;
        this.metrics.failedLogins.set(userId, count);

        return count > this.thresholds.maxFailedLogins;
    }

    checkResponseTime(time) {
        this.metrics.responseTimes.push(time);
        return time > this.thresholds.responseTimeThreshold;
    }

    checkErrorRate() {
        this.metrics.total++;
        const rate = this.metrics.errors / this.metrics.total;
        return rate > this.thresholds.errorRateThreshold;
    }
}

module.exports = AnomalyDetector;