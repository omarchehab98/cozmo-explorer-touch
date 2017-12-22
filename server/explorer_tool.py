#!/usr/bin/env python3

"""
    List all Cozmo animations on a web page with buttons to try the animations.
    In order to run this script, you also need all the other files inside the project.
    If that is the case, running this script will load the interface.

    Created by: GrinningHermit
"""
import datetime
import os
import queue
import random
import logging
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, disconnect
import eventlet

import flask_socket_helpers
import cozmo
import event_monitor
from viewer import viewer, activate_viewer
from remote_control import remote_control, activate_controls

# logging.basicConfig(format='%(asctime)s animation explorer %(levelname)s %(message)s', level=print)



thread = None
robot = None
cozmoEnabled = True
active_viewer = False
lists = []
async_mode = 'threading'
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.register_blueprint(viewer)
app.register_blueprint(remote_control)
q = queue.Queue()

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

socketio = SocketIO(app, async_mode=async_mode)

# Functions for event monitoring
def print_queue(qval):
    while qval.qsize() > 0:
        timestamp = '{:%H:%M:%S.%f}'.format(datetime.datetime.now())
        message = qval.get()
        print(timestamp + ' -> ' + message)
        socketio.emit('event',
            {'data': message, 'type': 'event', 'time': timestamp})


def background_thread(qval):
    while True:
        if not qval.empty():
            print_queue(qval)
        socketio.sleep(.1)


@socketio.on('connect')
def test_connect():
    global thread
    if thread is None:
        thread = socketio.start_background_task(background_thread, q)


@app.route('/')
def index():
    return render_template('index.html', randomID=random.randrange(1000000000, 9999999999))


def start_server():
    flask_socket_helpers.run_flask(socketio, app)


def cozmo_program(_robot: cozmo.robot.Robot):
    global robot
    global active_viewer
    robot = _robot

    try:
        event_monitor.monitor(robot, q)
        active_viewer = activate_viewer(robot)
        activate_controls(robot, socketio)
        start_server()

    except KeyboardInterrupt:
        print("\nExit requested by user")


try:
    cozmo.robot.Robot.drive_off_charger_on_connect = False
    cozmo.run_program(cozmo_program)

except SystemExit as e:
    cozmoEnabled = False
    try:
        start_server()
    except KeyboardInterrupt:
        print("\nExit requested by user")

