from flask import Flask, render_template, Response
import cv2
import mediapipe as mp
import numpy as np
from collections import deque

app = Flask(__name__)

# Global variables
bpoints = [deque(maxlen=1024)]
gpoints = [deque(maxlen=1024)]
rpoints = [deque(maxlen=1024)]
ypoints = [deque(maxlen=1024)]

blue_index = 0
green_index = 0
red_index = 0
yellow_index = 0

kernel = np.ones((5,5), np.uint8)

colors = [(255,0,0),(0,255,0),(0,0,255),(0,255,255)]
colorIndex = 0

paintWindow = np.zeros((471,636,3)) + 255
paintWindow = cv2.rectangle(paintWindow,(40,1),(140,65),(0,0,0),2)
paintWindow = cv2.rectangle(paintWindow,(160,1),(255,65),(255,0,0),2)
paintWindow = cv2.rectangle(paintWindow,(275,1),(370,65),(0,255,0),2)
paintWindow = cv2.rectangle(paintWindow,(390,1),(485,65),(0,0,255),2)
paintWindow = cv2.rectangle(paintWindow,(505,1),(600,65),(0,255,255),2)

cv2.putText(paintWindow,"CLEAR", (49,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
cv2.putText(paintWindow,"BLUE", (185,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
cv2.putText(paintWindow,"GREEN", (298,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
cv2.putText(paintWindow,"RED", (420,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
cv2.putText(paintWindow,"YELLOW", (520,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)

mpHands = mp.solutions.hands
hands = mpHands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mpDraw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

def generate_frames():
    global blue_index, green_index, red_index, yellow_index, colorIndex
    global bpoints, gpoints, rpoints, ypoints, paintWindow
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        x, y, c = frame.shape
        frame = cv2.flip(frame, 1)
        framergb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        paintWindow = cv2.rectangle(paintWindow,(40,1),(140,65),(0,0,0),2)
        paintWindow = cv2.rectangle(paintWindow,(160,1),(255,65),(255,0,0),2)
        paintWindow = cv2.rectangle(paintWindow,(275,1),(370,65),(0,255,0),2)
        paintWindow = cv2.rectangle(paintWindow,(390,1),(485,65),(0,0,255),2)
        paintWindow = cv2.rectangle(paintWindow,(505,1),(600,65),(0,255,255),2)

        cv2.putText(paintWindow,"CLEAR", (49,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
        cv2.putText(paintWindow,"BLUE", (185,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
        cv2.putText(paintWindow,"GREEN", (298,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
        cv2.putText(paintWindow,"RED", (420,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)
        cv2.putText(paintWindow,"YELLOW", (520,33), cv2.FONT_HERSHEY_SIMPLEX, 0.5,(0,0,0), 2, cv2.LINE_AA)

        cv2.rectangle(frame, (40, 1), (140, 65), (0, 0, 0), 2)
        cv2.rectangle(frame, (160, 1), (255, 65), (255, 0, 0), 2)
        cv2.rectangle(frame, (275, 1), (370, 65), (0, 255, 0), 2)
        cv2.rectangle(frame, (390, 1), (485, 65), (0, 0, 255), 2)
        cv2.rectangle(frame, (505, 1), (600, 65), (0, 255, 255), 2)

        cv2.putText(frame, "CLEAR", (49, 33), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, "BLUE", (185, 33), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, "GREEN", (298, 33), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, "RED", (420, 33), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2, cv2.LINE_AA)
        cv2.putText(frame, "YELLOW", (520, 33), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2, cv2.LINE_AA)

        result = hands.process(framergb)

        if result.multi_hand_landmarks:

            landmarks = []
            for handlsms in result.multi_hand_landmarks:
                for lm in handlsms.landmark:
                    lmx = int(lm.x * 640)
                    lmy = int(lm.y * 480)

                    landmarks.append([lmx, lmy])

                mpDraw.draw_landmarks(frame, handlsms, mpHands.HAND_CONNECTIONS)

            fore_finger = (landmarks[8][0], landmarks[8][1])
            center = fore_finger
            thumb = (landmarks[4][0], landmarks[4][1])
            cv2.circle(frame, center, 3, (0, 255, 0), -1)
            print(center[1] - thumb[1])
            if (thumb[1] - center[1] < 30):
                bpoints.append(deque(maxlen=512))
                blue_index += 1
                gpoints.append(deque(maxlen=512))
                green_index += 1
                ypoints.append(deque(maxlen=512))
                yellow_index += 1
                rpoints.append(deque(maxlen=512))
                red_index += 1

            elif center[1] <= 65:
                if 40 <= center[0] <= 140: # Clear Button
                    bpoints = [deque(maxlen=512)]
                    gpoints = [deque(maxlen=512)]
                    rpoints = [deque(maxlen=512)]
                    ypoints = [deque(maxlen=512)]

                    blue_index = 0
                    red_index = 0
                    yellow_index = 0
                    green_index = 0

                    paintWindow[67:,:,:] = 255
                elif 160 <= center[0] <= 255:
                    colorIndex = 0
                elif 275 <= center[0] <= 370:
                    colorIndex = 1
                elif 390 <= center[0] <= 485:
                    colorIndex = 2
                elif 505 <= center[0] <= 600:
                    colorIndex = 3

            else:
                if colorIndex == 0:
                    bpoints[blue_index].appendleft(center)
                elif colorIndex == 1:
                    gpoints[green_index].appendleft(center)
                elif colorIndex == 2:
                    rpoints[red_index].appendleft(center)
                elif colorIndex == 3:
                    ypoints[yellow_index].appendleft(center)

        else:
            bpoints.append(deque(maxlen=512))
            blue_index += 1
            gpoints.append(deque(maxlen=512))
            green_index += 1
            ypoints.append(deque(maxlen=512))
            yellow_index += 1
            rpoints.append(deque(maxlen=512))
            red_index += 1

        points = [bpoints, gpoints, rpoints, ypoints]

        for i in range(len(points)):
            for j in range(len(points[i])):
                for k in range(1, len(points[i][j])):
                    if points[i][j][k-1] is None or points[i][j][k] is None:
                        continue
                    cv2.line(frame, points[i][j][k-1], points[i][j][k], colors[i], 2)
                    cv2.line(paintWindow, points[i][j][k-1], points[i][j][k], colors[i], 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)

