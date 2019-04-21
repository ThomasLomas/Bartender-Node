# Node Bartender

This is a work in process project based on the Python Smart Bartender project - https://www.hackster.io/hackershack/smart-bartender-5c430e.

I decided to use Angular, Web Sockets, Node.JS to build a simple web app for controlling the bartender functions.

## Set up

Update the environment config in client/src/environments.prod.ts for the IP of the Pi.

1. On the raspberry pi install server node modules (`npm i`)
2. Install node modules inside the client folder (`cd client && npm i`)
3. Build the client (`cd client && ng build`)
4. Start the app up (`sudo node index.js`) - Must be ran as root in order to access the GPIO

# Flow Rate

1.2 seconds = 1ml
