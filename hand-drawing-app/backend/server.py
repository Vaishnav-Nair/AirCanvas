from flask import Flask, Response
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np

app = Flask(__name__)
CORS(app)

mpHands = mp.solutions.hands
hands = mpHands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mpDraw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

@app.route('/video_feed')
def video_feed():
    def generate():
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame = cv2.flip(frame, 1)
            framergb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            result = hands.process(framergb)

            if result.multi_hand_landmarks:
                for hand_landmarks in result.multi_hand_landmarks:
                    mpDraw.draw_landmarks(frame, hand_landmarks, mpHands.HAND_CONNECTIONS)

            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
