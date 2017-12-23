#!/usr/bin/env python3

"""
    List all Cozmo animations on a web page with buttons to try the animations.
    In order to run this script, you also need all the other files inside the project.
    If that is the case, running this script will load the interface.

    Created by: GrinningHermit
"""
import datetime
import queue
import logging
from flask import Flask
from flask_socketio import SocketIO, emit

import cozmo
import event_monitor
from viewer import viewer, activate_viewer
from remote_control import remote_control, activate_controls

def notify_events(eventQueue):
    global socketio
    while True:
        while eventQueue.qsize() > 0:
            timestamp = '{:%H:%M:%S.%f}'.format(datetime.datetime.now())
            message = eventQueue.get()
            print(timestamp + ' -> ' + message)
            socketio.emit('event', {
              'data': message,
              'type': 'event',
              'time': timestamp
            })
        socketio.sleep(.1)


def cozmo_program(_robot: cozmo.robot.Robot):
    global robot
    global eventQueue
    global socketio
    robot = _robot
    try:
        event_monitor.monitor(robot, eventQueue)
        activate_viewer(robot)
        activate_controls(robot, socketio)
        # Start server
        log = logging.getLogger('werkzeug')
        log.setLevel(logging.ERROR)
        socketio.run(app, host='127.0.0.1', port=5001)
    except KeyboardInterrupt:
        print("\nExit requested by user")


robot = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'somesecretphrase'
app.register_blueprint(viewer)
app.register_blueprint(remote_control)
socketio = SocketIO(app, async_mode='threading')
eventQueue = queue.Queue()
thread = socketio.start_background_task(notify_events, eventQueue)
# Instruct Cozmo not to drive off charger
cozmo.robot.Robot.drive_off_charger_on_connect = False
cozmo.run_program(cozmo_program)


@socketio.on('connect')
def on_socket_connect():
  global robot
  global socketio
  socketio.emit('initialization', {
    battery_voltage: robot.battery_voltage,
    is_on_charger: robot.is_on_charger,
  })
