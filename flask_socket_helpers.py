"""
Wrappers and helpers for using Flask with Cozmo.

Flask is a Python web framework. remote_control_cozmo.py and other js may use
these utility functions to interact with a web browser.

Created by: Anki
http://www.anki.com

Edited by: GrinningHermit

"""

import logging
import sys
from threading import Thread
import webbrowser
from time import sleep
import socket

def run_flask(socketio, app, host_ip='0.0.0.0', host_port=5000):
    '''
    Run the Flask webserver on specified host and port
    optionally also open that same host:port page in your browser to connect
    '''
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR)
    if socketio:
        socketio.run(app, host=host_ip, port=host_port)
    else:
        app.run(host=host_ip, port=host_port)

