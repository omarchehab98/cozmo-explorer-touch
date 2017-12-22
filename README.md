# Cozmo Explorer Tool v0.5
Interface exposing functionality of the robot Cozmo from Anki
---
This tool gives control over Cozmo. You can look through his camera while using keyboard buttons to control him. The event monitor helps in checking when he detects something, like seeing a cube or being picked up. It also includes all functions from the Animation Explorer, listing and playing all built-in animations. Making a movie, scaring your cat or writing code should be easier using the Cozmo Explorer Tool. A lot of the code is derived from remote-control-cozmo.py from the SDK examples and [cozmo-tools](https://github.com/touretzkyds/cozmo-tools)' event monitor.

![Cozmo-Explorer-Tool](explorer-tool.png)

What does it do exactly?
-
Running the script 'explorer_tool.py' in python will open a web page. It is divided in 3 sections:

ROBOT CAMERA AND CONTROL: A constant camera feed is visible. While mousing over this area, controls for Cozmo are also visible, indicating how to control Cozmo with the keyboard. It's also possible to make the feed full screen and turn on the IR light or turn on free play mode which makes Cozmo roam around freely as if he's in 'app' mode instead of SDK mode.

What do you need to use it?
-
1. Cozmo himself (http://anki.com/cozmo)
2. A PC and a mobile device
3. A little knowledge about Python
4. Knowledge of the Cozmo SDK (http://cozmosdk.anki.com/docs)
5. The files in this repository
6. The python module Pillow. (pip3 install --user Pillow, usually already installed when working with the Cozmo SDK)
7. The python module Flask. (pip3 install --user flask)
8. The python module Flask Socket-IO. (pip3 install --user flask-socketio)

If you know how to run an example file from the Cozmo SDK, you should be able to run this script. 

System requirements
-
- PC with Windows OS, mac OSX or Linux
- Python 3.5.1 or later
- WiFi connection
- An iOS or Android mobile device with the Cozmo app installed, connected to the PC via USB cable

Installation notes
-
- Run 'explorer_tool.py' and open a browser window at 0.0.0.0:5000. Similar to 'remote_control_cozmo.py' from the Cozmo SDK examples.
- Install the entire project, not just the .py file, or it won't work.



