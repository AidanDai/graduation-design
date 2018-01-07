import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

redLED = 40
yellowLED = 38
blueLED = 32

GPIO.setup(redLED, GPIO.OUT)
GPIO.setup(yellowLED, GPIO.OUT)
GPIO.setup(blueLED, GPIO.OUT)

def forward(delay):
  setStep(0, 1, 1)
  time.sleep(delay)
  setStep(1, 0, 1)
  time.sleep(delay)
  setStep(1, 1, 0)
  time.sleep(delay)

def setStep(w1, w2, w3):
  GPIO.output(redLED, w1)
  GPIO.output(yellowLED, w2)
  GPIO.output(blueLED, w3)

while True:
	forward(5)

GPIO.cleanup()
