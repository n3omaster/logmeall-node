class LogMeAll {

    constructor({ apiUrl, apiKey, apiSecret, environment }) {
        this.apiUrl = apiUrl || 'https://www.logmeall.com/api';
        this.apiKey = apiKey || '';
        this.apiSecret = apiSecret || '';
        this.environment = environment || 'development';
    }

    async sendLog(level, ...args) {

        console.log(level, ...args);

        // Build Body for API Request
        const logData = {
            level,
            tags: args.find(arg => typeof arg === 'object' && arg.hasOwnProperty('tags'))?.tags || [],
            environment: this.environment,
            message: args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' '),
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': this.apiKey,
                    'X-API-SECRET': this.apiSecret,
                },
                body: JSON.stringify(logData),
            });

            if (!response.ok) { console.error(`Failed to send log to API: ${response.statusText}`); }

        } catch (error) {
            console.error('Error sending log to API:', error);
        }
    }

    debug(...args) {
        this.sendLog('debug', ...args);
    }

    info(...args) {
        this.sendLog('info', ...args);
    }

    warning(...args) {
        this.sendLog('warn', ...args);
    }

    error(...args) {
        this.sendLog('error', ...args);
    }
}

export default LogMeAll;
