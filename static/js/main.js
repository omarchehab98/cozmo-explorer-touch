const buttonIdToKeyCode = {
    // Forward
    "ctrl_btn_W": 87,
    // Back
    "ctrl_btn_S": 83,
    // Left
    "ctrl_btn_A": 65,
    // Right
    "ctrl_btn_D": 68,
    // Head up
    "ctrl_btn_Q": 81,
    // Head down
    "ctrl_btn_E": 69,
    // Arm up
    "ctrl_btn_R": 82,
    // Arm down
    "ctrl_btn_F": 70,
    // Speed up
    "ctrl_state_SHIFT": 16,
    // Slow down
    "ctrl_state_ALT": 18,
    // IR light toggle
    "ctrl_toggle_I": 73,
    // Free Play toggle
    "ctrl_toggle_P": 80
}

window.addEventListener('load', function () {
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    socket.on('event', console.log);

    let isFreeplayEnabled, isHeadlightEnabled;

    const controlButtons = [
        // Forward
        "ctrl_btn_W",
        // Back
        "ctrl_btn_S",
        // Left
        "ctrl_btn_A",
        // Right
        "ctrl_btn_D",
        // Head up
        "ctrl_btn_Q",
        // Head down
        "ctrl_btn_E",
        // Arm up
        "ctrl_btn_R",
        // Arm down
        "ctrl_btn_F"
    ];

    controlButtons
        .map((id) => document.getElementById(id))
        .forEach(function (button) {
            button.addEventListener('mousedown', function () {
                socket.emit('keydown', {
                    keyCode: buttonIdToKeyCode[button.id],
                    hasShift: isShiftDown ? 1 : 0,
                    hasCtrl: 0,
                    hasAlt: isShiftDown ? 1 : 0
                });
            });
            button.addEventListener('mouseup', function () {
                socket.emit('keyup', {
                    keyCode: buttonIdToKeyCode[button.id],
                    hasShift: isShiftDown ? 1 : 0,
                    hasCtrl: 0,
                    hasAlt: isAltDown ? 1 : 0
                });
            });
        });

    // Speed up
    document.getElementById("ctrl_state_SHIFT")
        .addEventListener('mousedown', function () {
            socket.emit('keydown', {
                keyCode: 16,
                hasShift: 1,
                hasCtrl: 0,
                hasAlt: 0
            });
        });
    document.getElementById("ctrl_state_SHIFT")
        .addEventListener('mouseup', function () {
            socket.emit('keyup', {
                keyCode: 16,
                hasShift: 0,
                hasCtrl: 0,
                hasAlt: 0
            });
        });

    // Slow down
    document.getElementById("ctrl_state_ALT")
        .addEventListener('mousedown', function () {
            socket.emit('keydown', {
                keyCode: 18,
                hasShift: 0,
                hasCtrl: 0,
                hasAlt: 1
            });
        });
    document.getElementById("ctrl_state_ALT")
        .addEventListener('mouseup', function () {
            socket.emit('keyup', {
                keyCode: 18,
                hasShift: 0,
                hasCtrl: 0,
                hasAlt: 0
            });
        });

    // Toggle IR headlight
    document.getElementById("ctrl_toggle_I")
        .addEventListener('click', function () {
            isHeadlightEnabled = !isHeadlightEnabled;
            socket.emit("setHeadlightEnabled", { isHeadlightEnabled });
        });

    // Toggle free play mode
    document.getElementById("ctrl_toggle_P")
        .addEventListener('click', function () {
            isFreeplayEnabled = !isFreeplayEnabled;
            socket.emit('setFreeplayEnabled', { isFreeplayEnabled });
        });

    // Keep track of which keys are being held so we don't have to emit more than once.
    const keysDown = {};
    
    document.addEventListener("keydown", function (event) {
        const keyCode = event.keyCode || event.which;
        if (keysDown[keyCode]) {
            return
        }

        switch (keyCode) {
            // I
            case 73:
                isHeadlightEnabled = !isHeadlightEnabled;
                socket.emit("setHeadlightEnabled", { isHeadlightEnabled });
                break;

            // P
            case 80:
                isFreeplayEnabled = !isFreeplayEnabled;
                socket.emit("setFreeplayEnabled", { isFreeplayEnabled });
                break;

            default:
                keysDown[keyCode] = true;
                socket.emit("keydown", {
                    keyCode: event.keyCode || event.which,
                    hasShift: event.shiftKey ? 1 : 0,
                    hasCtrl: event.ctrlKey ? 1 : 0,
                    hasAlt: event.altKey ? 1 : 0
                });
        }
    });

    document.addEventListener("keyup", function (event) {
        const keyCode = event.keyCode || event.which;
        delete keysDown[keyCode];
        socket.emit("keyup", {
            keyCode: event.keyCode || event.which,
            hasShift: event.shiftKey ? 1 : 0,
            hasCtrl: event.ctrlKey ? 1 : 0,
            hasAlt: event.altKey ? 1 : 0
        });
    });

    document.addEventListener('visibilitychange' , function() {
        const keyCodes = Object.values(buttonIdToKeyCode)
        keyCodes.forEach((keyCode) => {
            socket.emit("keyup", {
                keyCode,
                hasShift: 0,
                hasCtrl: 0,
                hasAlt: 0
            });    
        })
    });
});
