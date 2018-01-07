import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

ENP = 32
CWP = 37
CPP = 38
ENG = 40

GPIO.setup(ENP, GPIO.OUT)
GPIO.setup(ENG, GPIO.OUT)
GPIO.setup(CWP, GPIO.OUT)
GPIO.setup(CPP, GPIO.OUT)

def forward(delay):
  setStep(1, 0, 1, 0)
  time.sleep(delay)
  setStep(1, 1, 1, 0)
  time.sleep(delay)

def setStep(w1, w2, w3, w4):
  GPIO.output(ENP, w1)
  GPIO.output(CWP, w2)
  GPIO.output(CPP, w3)
  GPIO.output(ENG, w4)

while True:
	forward(0.5)

GPIO.cleanup()
