import createServer from "./server.js";

const app = createServer();

app.listen(8080, function () {
  console.log("Server is listening on port 8080");
});