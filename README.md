# LogMeAll

LogMeAll is a simple logging package that logs messages to the console and sends them to an API.

## Installation

```bash
npm install logmeall
```

## Usage

```javascript
import LogMeAll from 'logmeall';

const log = new LogMeAll({
  apiUrl: 'https://www.logmeall.com/api',
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});

log.info('This is an info message');
log.error('This is an error message');
log.debug('This is a debug message');
log.notice('This is a notice message');
log.warning('This is a warning message');
```

## Advanced Usage

```javascript
log.info('This is an info message', { tags: ['tag1', 'tag2'] });
```

## License

This project is licensed under the MIT License.