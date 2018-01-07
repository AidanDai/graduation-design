import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

redLED = 40
i = 0

GPIO.setup(redLED, GPIO.OUT)

while True:
  print i % 2
  GPIO.output(redLED, i % 2)
  i += 1
  time.sleep(2)

GPIO.cleanup()
