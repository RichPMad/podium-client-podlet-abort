const HapiLayout = require("@podium/hapi-layout");
const Layout = require("@podium/layout");
const Hapi = require("@hapi/hapi");

const init = async () => {
  const app = Hapi.Server({
    host: "localhost",
    port: 7777,
  });

  const layout = new Layout({
    pathname: "/",
    name: "layout",
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

  await app.register({
    plugin: new HapiLayout(),
    options: layout,
  });

  app.route({
    method: "GET",
    path: layout.pathname(),
    handler: async (request, h) => {
      const incoming = request.app.podium;
      try {
        const result = await podlet.fetch(incoming);
        return h.podiumSend(result.content);
      } catch (error) {
        console.error(error);
      }
      return error;
    },
  });

  app.start();
};

init();
