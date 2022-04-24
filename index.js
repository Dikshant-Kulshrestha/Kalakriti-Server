const { createServer } = require("http");

const app = require("./app.js");

const { PORT } = require("./config.js");
const { info } = require("./utils/logger.js");

const server = createServer(app);

server.listen(PORT, () => {
  info(`Server Listening at Port ${PORT}`);
});
