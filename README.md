# Testing podium client version missmatch re-fetch

## Whats happening?

On node 16+, if a podlet manifest version has changed, podium client will mark it as stale and try fetch a fresh version.
If the podlet response is large enough, this will fail and abort the connection.

On node 14 this does not happen.

## Starting it up

- `npm i`

1. in one terminal `npm run layout`
2. in another `npm run podlet`
3. visit http://localhost:7777 , you will a response on the page. refresh the page
4. shut down the podlet, and run it again. The version changes startup automatically
5. visit http://localhost:7777 again, and notice the page is empty, as the client resolver.content.js receives an `error` event

Reduce the podlet response size to see it work again on node 16 https://github.com/RichPMad/podium-client-podlet-abort/blob/main/packages/podlet/express.js#L18

## @podium/layout/client@5

Podium client v5 with undici works! So i will jump to the conclusion its request lib.

- run `npm run layout-esm` instead to test with this version.
