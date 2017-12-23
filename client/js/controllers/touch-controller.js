import throttle from 'lodash/throttle'

function createTouchController({ env, cozmoController }) {
  const touchSliders = document.getElementsByClassName('touch-slider');
  Array.prototype.forEach.call(touchSliders, touchSlider => {
    const touchSliderKnob = touchSlider.getElementsByClassName('touch-slider-knob')[0]
    let currentTouchId = null
    
    touchSlider.addEventListener('touchstart', event => {
      const touch = event.changedTouches[0]
      currentTouchId = touch.identifier
      const { translateY } = styleTouchSliderKnob(touchSliderKnob, {
        touchSlider,
        touch,
      })
      commandCozmoBasedOnButton(cozmoController, touchSlider, touchSliderKnob, translateY)
    })

    touchSlider.addEventListener('touchmove', throttle(
      event => {
        const touch = Array.prototype.find.call(event.changedTouches,
          touch => touch.identifier === currentTouchId)
        if (touch) {
          const { translateY } = styleTouchSliderKnob(touchSliderKnob, {
            touchSlider,
            touch,
          })
          commandCozmoBasedOnButton(cozmoController, touchSlider, touchSliderKnob, translateY)
        }
      },
      // Only run listener once every
      33 // ms
    ))

    touchSlider.addEventListener('touchend', event => {
      currentTouchId = null
      const { translateY } = styleTouchSliderKnob(touchSliderKnob, {
        touchSlider,
        offsetTop: getTouchSliderKnobRestingOffset(touchSlider, touchSliderKnob)
      })
      commandCozmoBasedOnButton(cozmoController, touchSlider, touchSliderKnob, translateY)
    })

    touchSlider.addEventListener('mousedown', event => {
      const touch = event
      currentTouchId = 'pointer'
      const { translateY } = styleTouchSliderKnob(touchSliderKnob, {
        touchSlider,
        touch,
      })
      commandCozmoBasedOnButton(cozmoController, touchSlider, touchSliderKnob, translateY)
    })

    touchSlider.addEventListener('mousemove', throttle(
      event => {
        const touch = currentTouchId && event
        if (touch) {
          const { translateY } = styleTouchSliderKnob(touchSliderKnob, {
            touchSlider,
            touch,
          })
          commandCozmoBasedOnButton(cozmoController, touchSlider, touchSliderKnob, translateY)
        }
      },
      // Only run listener once every
      33 // ms
    ))

    touchSlider.addEventListener('mouseup', event => {
      currentTouchId = null
      const { translateY } = styleTouchSliderKnob(touchSliderKnob, {
        touchSlider,
        offsetTop: getTouchSliderKnobRestingOffset(touchSlider, touchSliderKnob)
      })
      commandCozmoBasedOnButton(cozmoController, touchSlider, touchSliderKnob, translateY)
    })
  })
}


function styleTouchSliderKnob(touchSliderKnob, {
  touchSlider,
  // If offsetTop is defined, tranlateY is set to offsetTop
  offsetTop,
  // If offsetTop is not defined, translateY is set based on touch.clientY
  touch,
}) {
  const safeOffsetTop = offsetTop || Math.max(
    // Minimum offset
    0,
    Math.min(
      // Maximum offset
      touchSlider.offsetHeight - touchSliderKnob.offsetHeight,
      // Computed offset
      touch.clientY - touchSlider.getBoundingClientRect().top - touchSliderKnob.offsetHeight / 2
    )
  );
  touchSliderKnob.style.transform = `translateY(${safeOffsetTop}px)`
  return {
    translateY: safeOffsetTop
  }
}

function commandCozmoBasedOnButton(cozmoController, touchSlider, touchSliderKnob, translateY) {
  const normalizedOffsetFromCenter =
    (getTouchSliderKnobRestingOffset(touchSlider, touchSliderKnob) - translateY) /
    getTouchSliderKnobRestingOffset(touchSlider, touchSliderKnob)
  
  switch(touchSlider.id) {
    case 'touch-speed':
      switch (getZone(7, normalizedOffsetFromCenter)) {
        case 3:
          cozmoController.slowOff();
          cozmoController.speedOn();
          cozmoController.backwardOff();
          cozmoController.forwardOn();
          break;

        case 2:
          cozmoController.slowOff();
          cozmoController.speedOff();
          cozmoController.backwardOff();
          cozmoController.forwardOn();
          break;

        case 1:
          cozmoController.speedOff();
          cozmoController.slowOn();
          cozmoController.backwardOff();
          cozmoController.forwardOn();
          break;

        case 0:
          cozmoController.slowOff();
          cozmoController.speedOff();
          cozmoController.backwardOff();
          cozmoController.forwardOff();
          break;

        case -1:
          cozmoController.speedOff();
          cozmoController.slowOn();
          cozmoController.forwardOff();
          cozmoController.backwardOn();
          break;

        case -2:
          cozmoController.slowOff();
          cozmoController.speedOff();
          cozmoController.forwardOff();
          cozmoController.backwardOn();
          break;
        
        case -3:
          cozmoController.slowOff();
          cozmoController.speedOn();
          cozmoController.forwardOff();
          cozmoController.backwardOn();
          break;
      }
      break;

    case 'touch-lift':
      switch (getZone(3, normalizedOffsetFromCenter)) {
        case 1:
          cozmoController.slowOn();
          cozmoController.liftLowerOff();
          cozmoController.liftRaiseOn();
          break;
          
        case 0:
          cozmoController.slowOff();
          cozmoController.liftLowerOff();
          cozmoController.liftRaiseOff();
          break;
        
        case -1:
          cozmoController.slowOn();
          cozmoController.liftRaiseOff();
          cozmoController.liftLowerOn();
          break;
      }
      break;

    case 'touch-head':
      switch (getZone(3, normalizedOffsetFromCenter)) {
        case 1:
          cozmoController.slowOn();
          cozmoController.headLowerOff();
          cozmoController.headRaiseOn();
          break;
          
        case 0:
          cozmoController.slowOff();
          cozmoController.headLowerOff();
          cozmoController.headRaiseOff();
          break;
        
        case -1:
          cozmoController.slowOn();
          cozmoController.headRaiseOff();
          cozmoController.headLowerOn();
          break;
      }
      break;
  }
}

function getZone(zoneCount, magnitude) {
  return Math.max(1, Math.ceil(zoneCount * (magnitude + 1) / 2)) - (zoneCount + 1) / 2
}

function getTouchSliderKnobRestingOffset(touchSlider, touchSliderKnob) {
  return (touchSlider.offsetHeight - touchSliderKnob.offsetHeight) / 2
}

export default createTouchController
