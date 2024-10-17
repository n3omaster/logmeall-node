# LogMeAll

LogMeAll is a simple logging package that logs messages to the console and sends them to an API.

## Installation

```bash
npm install logmeall
```

## Usage

```javascript
import LogMeAll from 'logmeall';

const logger = new LogMeAll({
  apiUrl: 'https://www.logmeall.com/api',
  apiKey: 'your-api-key',
});

logger.info('This is an info message');
logger.error('This is an error message');
logger.debug('This is a debug message');
logger.notice('This is a notice message');
logger.warning('This is a warning message');
```

## License

This project is licensed under the MIT License.