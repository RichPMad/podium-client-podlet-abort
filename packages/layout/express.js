const express = require("express");
const Layout = require("@podium/layout");

const app = express();

const layout = new Layout({
  name: "myLayout",
  pathname: "/",
  logger: console,
  client: {
    timeout: 60000,
  },
  proxy: {
    timeout: 60000,
  },
});

const podlet = layout.client.register({
  name: "myPodlet",
  uri: "http://localhost:7100/manifest.json",
  timeout: 60000,
});

app.use(layout.middleware());

app.get("/", async (req, res) => {
  const incoming = res.locals.podium;
  const response = await podlet.fetch(incoming);

  res.podiumSend(response);
});

app.listen(7777);
