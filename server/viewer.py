"""

Remote control for Cozmo
============================

Based on remote_control_cozmo.py for cozmo SDK:
https://developer.anki.com

Created by: Anki

Edited by: GrinningHermit

Code from example file is separated in 2 functionalities:
- viewer / robot camera <-- this is where you are
- keyboard command handling

=====

"""
from io import BytesIO
from time import sleep
import cozmo
from flask import Blueprint, Response
from PIL import Image, ImageDraw, ImageEnhance, ImageChops, ImageFilter

viewer = Blueprint('viewer', __name__)

robot = None

@viewer.route("/cozmoImage")
def handle_cozmoImage():
    """Stream of video from cozmo's camera"""
    response = Response(cozmoImageGenerator(16, 30),
        mimetype='multipart/x-mixed-replace; boundary=frame')
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response


def cozmoImageGenerator(fps=30, quality=90):
    """
    Generates image frames at a given rate per second for use in a multiple/x-mixed-replace response
    """
    while True:
        image = robot.world.latest_image
        if image:
            image = image.raw_image
            
            # Smoothen the image
            image = image.filter(ImageFilter.SMOOTH_MORE)
            
            # Tint the image seagreen (seagreen is a name of a color), grey is too boring
            image = ImageChops.multiply(image, Image.new('RGB', image.size, '#296a70'))
            
            # Increase the brightness of the image
            image = ImageEnhance.Brightness(image).enhance(1.5)

            # Continuously draw horizontal lines on the image
            linesOverlayImage = Image.new('RGBA', image.size)
            linesOverlayDraw = ImageDraw.Draw(linesOverlayImage)
            for y in range(1, image.size[1], 5):
                linesOverlayDraw.line((0, y, image.size[0], y), fill=(0, 0, 0, 64), width=2)
            image.paste(linesOverlayImage, mask=linesOverlayImage)
        else:
            # Show a gray image
            image_width = 320
            image_height = 240
            image_bytes = bytearray([0x70, 0x70, 0x70]) * image_width * image_height
            image = Image.frombytes('RGB', (image_width, image_height), bytes(image_bytes))

        # Encode the image as jpeg
        frame = BytesIO()
        image.save(frame, 'JPEG', quality=quality)
        frame.seek(0)

        # Serve 24 frames a second
        yield (b'--frame\r\n'
                b'Content-Type: ' + str.encode('image/jpeg')
                + b'\r\n\r\n'
                + frame.getvalue()
                + b'\r\n')
        
        sleep(1 / fps)


def activate_viewer(_robot):
    global robot
    robot = _robot
    # Turn on image receiving by the camera
    robot.camera.image_stream_enabled = True
    return True
