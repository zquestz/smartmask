# SmartMask

A small web based smartBCH wallet powered by MetaMask.
https://smartmask.cash

Adding Assets/Tokens
--------------------
- Edit `assetList.js` to add your token.
- Add an icon for your asset in `/public/img/assets/`.
- Make sure to use checksummed addresses.
- Profit!

Build & Run the Docker Image
----------------------------
In order to build and run the site:

1. `docker build -t smartmask .`
2. `docker run -p 8888:80 smartmask:latest`

Now the site is running at http://localhost:8888.

License
-------

SmartMask is released under the terms of the MIT license. See [COPYING](COPYING) for more
information or see https://opensource.org/licenses/MIT.
