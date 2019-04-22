const fs = require('fs');
const WebSocket = require('ws')

function getRandomInt(intMin, intMax) {
  return Math.floor(intMin) + Math.floor(Math.random() * Math.floor(intMax));
}

function getRandomFloat(floatMin, floatMax) {
  return floatMin + Math.random() * floatMax;
}

function getMsToNextDatapoint() {
  return getRandomInt(10, 1500);
}

function getNextDatapoint() {
  const securityIndex = getRandomInt(0, securities.length - 1);
  const security = securities[securityIndex];
  return {
    'symbol': security,
    'price': prices[security] * (1 + getRandomFloat(-0.01, 0.01)),
  };
}

// Read the input data.
const prices = JSON.parse(fs.readFileSync(require('path').resolve(__dirname, 'securities.json'), 'utf8'));
const securities = Object.keys(prices);

// Setup the web-socket server
const wssPort = 8043;
const wss = new WebSocket.Server({port: wssPort})

wss.on('connection', ws => {
  console.log('Connected to the WS server');

  // Start the random data scheduler.
  const callback = () => {
    ws.send(JSON.stringify(getNextDatapoint()));
    setTimeout(callback, getMsToNextDatapoint())
  };
  setImmediate(callback);
})
console.log('Ready to accept WS connections on ' + wssPort);
