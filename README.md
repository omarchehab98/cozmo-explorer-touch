# Cozmo Explorer Touch

![Cozmo-Explorer-Tool](explorer-tool.png)

## What does it do exactly?

With this tool you can control Cozmo from the browser. I created it so that my family and friends can control Cozmo overseas. In a nutshell, it allows you to remote control cozmo from anywhere.

## What do you need to use it?

1. Cozmo (http://anki.com/cozmo)
2. A PC and a mobile device connected via USB cable
3. The files in this repository `git clone https://github.com/omarchehab98/cozmo-explorer-touch`

### Requirements

* Device running Windows OS, Mac OSX or Linux with an internet connection
  * [Cozmo SDK is setup](http://cozmosdk.anki.com/docs)
  * Python 3 and pip
    * The python module Pillow `pip3 install --user Pillow`
    * The python module Flask `pip3 install --user flask`
    * The python module Flask Socket-IO `pip3 install --user flask-socketio`
    * The python module Cozmo with camera support `pip3 install --user 'cozmo[camera]'`
  * Node Carbon and npm
    * In the `client` directory, run `npm install`

* Device running iOS or Android
  * Cozmo app installed
  * Connected to computer via USB cable
  * Cozmo app is in SDK mode

### Starting the server

* Run `server/explorer_tool.py` and open a browser window at http://localhost:5000
* In the client directory, run `npm start`

## License

Forked from [GrinningHermit/Cozmo-Explorer-Tool](https://github.com/GrinningHermit/Cozmo-Explorer-Tool).

MIT &copy; 2017 Omar Chehab
