class LogMeAll {

    constructor({ apiUrl, apiKey, apiSecret, environment }) {
        this.apiUrl = apiUrl || 'https://www.logmeall.com/api';
        this.apiKey = apiKey || '';
        this.apiSecret = apiSecret || '';
        this.environment = environment || 'development';
    }

    async sendLog(level, ...args) {

        console.log(level, ...args);

        // Extract tags and message from args
        const tags = args.find(arg => Array.isArray(arg?.tags))?.tags || [];
        const message = String(args[0]);
        const data = args.length > 1
            ? args.slice(1).map(arg =>
                typeof arg === 'object' ? arg : String(arg)
            ).join(' ')
            : '';

        // Build Body for API Request
        const logData = {
            level,
            tags,
            environment: this.environment,
            message,
            data,
            timestamp: new Date().toISOString(),
        };

        console.log('logData:', JSON.stringify(logData));

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

            if (!response.ok) {
                console.error(`Failed to send log to API: ${response.statusText}`);
                return;
            }

            const responseBody = await response.json();
            console.log('responseBody:', responseBody);

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