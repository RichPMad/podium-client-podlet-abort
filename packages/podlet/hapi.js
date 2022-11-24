const HapiPodlet = require("@podium/hapi-podlet");
const Podlet = require("@podium/podlet");
const Hapi = require("@hapi/hapi");

const init = async () => {
  const app = Hapi.Server({
    host: "localhost",
    port: 7100,
  });

  const podlet = new Podlet({
    pathname: "/",
    version: Date.now().toString(),
    name: "podletContent",
  });

  await app.register({
    plugin: new HapiPodlet(),
    options: podlet,
  });

  app.route({
    method: "GET",
    path: podlet.content(),
    handler: (request, h) => {
      return h.podiumSend("podlet response " + Date.now() + new Array(65272).fill("!").join(""));
      // return h.podiumSend(new Array(65535).fill("1").join(""));
    },
  });

  app.route({
    method: "GET",
    path: podlet.manifest(),
    handler: (request, h) => JSON.stringify(podlet),
  });

  app.start();
};

init();
