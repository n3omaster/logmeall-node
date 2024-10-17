class LogMeAll {

    constructor(apiUrl) {
        this.apiUrl = apiUrl || 'https://www.logmeall.com/api';
    }

    async sendLog(level, ...args) {

        console.log(level, ...args);

        const logData = {
            level,
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
        this.sendLog('log', ...args);
    }

    notice(...args) {
        this.sendLog('notice', ...args);
    }

    warning(...args) {
        this.sendLog('warn', ...args);
    }

    error(...args) {
        this.sendLog('error', ...args);
    }
}

export default new LogMeAll();
