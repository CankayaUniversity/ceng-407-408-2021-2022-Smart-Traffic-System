# TechVidvan Vehicle counting and Classification

# Import necessary packages
import time

import cv2
import csv
import collections
import numpy as np
from tracker import *
from datetime import datetime, timedelta, date
temp1="green"
temp2="red"
redtime=40
greentime=80
side1vec=1
side2vec=1
end_timeR = datetime.now() + timedelta(seconds=redtime)
end_timeG = end_timeR + timedelta(seconds=greentime)

# Initialize Tracker
tracker = EuclideanDistTracker()
# Initialize the videocapture object
cap = cv2.VideoCapture('Python/videoo.mkv')
input_size = 320

# Detection confidence threshold
confThreshold = 0.2
nmsThreshold = 0.2
green_light = (0,255,0)
font_color = (0, 0, 255)
font_size = 0.5
font_thickness = 2

# Cross line positions

# Store Coco Names in a list
classesFile = "Python/coco.names"
classNames = open(classesFile).read().strip().split('\n')
print(classNames)
print(len(classNames))

# class index for our required detection classes
required_class_index = [2, 3, 5, 7]

detected_classNames = []

## Model Files
modelConfiguration = 'Python/yolov3-320.cfg'
modelWeigheights = 'Python/yolov3-320.weights'

# configure the network model
net = cv2.dnn.readNetFromDarknet(modelConfiguration, modelWeigheights)

# Configure the network backend

net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# Define random colour for each class
np.random.seed(42)
colors = np.random.randint(0, 255, size=(len(classNames), 3), dtype='uint8')


# Function for finding the center of a rectangle
def find_center(x, y, w, h):
    x1 = int(w / 2)
    y1 = int(h / 2)
    cx = x + x1
    cy = y + y1
    return cx, cy


# Function for finding the center of a rectangle
def find_center(x, y, w, h):
    x1 = int(w / 2)
    y1 = int(h / 2)
    cx = x + x1
    cy = y + y1
    return cx, cy


# List for store vehicle count information
temp_1_list = []
temp_2_list = []
temp_3_list = []
pass_list = []
side1_list = [0, 0, 0, 0]
side2_list = [0, 0, 0, 0]
side3_list = [0, 0, 0, 0]

from threading import Timer


def display(msg):
    print(msg + ' ' + time.strftime('%H:%M:%S'))


# Function for count vehicle


def count_vehicle(box_id, img, temp1, temp2, end_timeR, end_timeG):
    x, y, w, h, id, index = box_id
    # Find the center of the rectangle for detection
    center = find_center(x, y, w, h)
    ix, iy = center
    # Find the current position of the vehicle

    if temp1 == "green" and temp2 == "red" and datetime.now() < end_timeR:

        if ((iy > 10) and (iy < 120) and (ix > 690) and (ix < 800)) or (
                (iy > 440) and (iy < 450) and (ix > 0) and (ix < 130)):
            if id not in temp_2_list:
                temp_2_list.append(id)
            elif id in temp_2_list and id not in pass_list:
                temp_2_list.remove(id)
                pass_list.append(id)
                side2_list[index] = side2_list[index] + 1

    if end_timeR - datetime.now() < datetime.now() - datetime.now():
        cv2.putText(img, "site1 red: wait", (900, 500), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color, font_thickness)
        cv2.putText(img, "site2 green: wait", (500, 50), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                    font_thickness)
    else:
        cv2.putText(img, "site1 red: " + str(end_timeR - datetime.now()), (900, 500), cv2.FONT_HERSHEY_SIMPLEX,
                    font_size, font_color, font_thickness)
        cv2.putText(img, "site2 green: " + str(end_timeR - datetime.now()), (500, 50), cv2.FONT_HERSHEY_SIMPLEX,
                    font_size, font_color, font_thickness)

    if temp1 == "red" and temp2 == "green" and datetime.now() < end_timeG:
        if ((iy > 300) and (iy < 700) and (ix > 690) and (ix < 1100)) or (
                (iy > 80) and (iy < 175) and (ix > 150) and (ix < 300)):
            if id not in temp_1_list:
                temp_1_list.append(id)
            if id in temp_1_list and id not in pass_list:
                temp_1_list.remove(id)
                pass_list.append(id)
                side1_list[index] = side1_list[index] + 1

    if end_timeR - datetime.now() < datetime.now() - datetime.now():
        cv2.putText(img, "site1 green: " + str(end_timeG - datetime.now()), (500, 500), cv2.FONT_HERSHEY_SIMPLEX,
                    font_size, font_color, font_thickness)
        cv2.putText(img, "site2 red: " + str(end_timeG - datetime.now()), (900, 50), cv2.FONT_HERSHEY_SIMPLEX,
                    font_size, font_color, font_thickness)
    else:
        cv2.putText(img, "site1 green: wait", (500, 500), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                    font_thickness)
        cv2.putText(img, "site2 red: wait", (900, 50), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color, font_thickness)


# Function for finding the detected objects from the network output
def postProcess(outputs, img, temp1, temp2, side1vec, side2vec, end_timeR, end_timeG):
    global detected_classNames
    height, width = img.shape[:2]
    boxes = []
    classIds = []
    confidence_scores = []
    detection = []
    for output in outputs:
        for det in output:
            scores = det[5:]
            classId = np.argmax(scores)
            confidence = scores[classId]
            if classId in required_class_index:
                if confidence > confThreshold:
                    # print(classId)
                    w, h = int(det[2] * width), int(det[3] * height)
                    x, y = int((det[0] * width) - w / 2), int((det[1] * height) - h / 2)
                    boxes.append([x, y, w, h])
                    classIds.append(classId)
                    confidence_scores.append(float(confidence))

    # Apply Non-Max Suppression
    indices = cv2.dnn.NMSBoxes(boxes, confidence_scores, confThreshold, nmsThreshold)
    # print(classIds)
    for i in indices.flatten():
        x, y, w, h = boxes[i][0], boxes[i][1], boxes[i][2], boxes[i][3]
        # print(x,y,w,h)

        color = [int(c) for c in colors[classIds[i]]]
        name = classNames[classIds[i]]
        detected_classNames.append(name)
        # Draw classname and confidence score
        cv2.putText(img, f'{name.upper()} {int(confidence_scores[i] * 100)}%',
                    (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)

        # Draw bounding rectangle
        cv2.rectangle(img, (x, y), (x + w, y + h), color, 1)
        detection.append([x, y, w, h, required_class_index.index(classIds[i])])
    # Update the tracker for each object
    boxes_ids = tracker.update(detection)
    for box_id in boxes_ids:
        count_vehicle(box_id, img, temp1, temp2, end_timeR, end_timeG)


def realTime():
    inn = 0
    while True:
        if inn == 0:
            temp1 = "red"
            temp2 = "green"
            redtime = 40
            greentime = 80
            side1vec = 1
            side2vec = 1
            end_timeR = datetime.now() + timedelta(seconds=redtime)
            end_timeG = end_timeR + timedelta(seconds=greentime)
            inn = inn + 1

        if end_timeR - datetime.now() < datetime.now() - datetime.now():
            temp1 = "green"
            temp2 = "red"
        if end_timeR - datetime.now() < datetime.now() - datetime.now() and end_timeG - datetime.now() < datetime.now() - datetime.now():
            temp1 = "red"
            temp2 = "green"
            if side1vec / side2vec > 1:
                greentime = 120 / ((side1vec / side2vec) + 1) * (side1vec / side2vec)
                redtime = 120 - greentime

            elif side1vec / side2vec < 1:
                redtime = 120 / ((side2vec / side1vec) + 1) * (side2vec / side1vec)
                greentime = 120 - redtime
            end_timeR = datetime.now() + timedelta(seconds=redtime)
            end_timeG = end_timeR + timedelta(seconds=greentime)

        side2vec = side2_list[0] + side2_list[1] / 2 + side2_list[2] * 2 + side2_list[3] * 2
        if side2vec == 0:
            side2vec = 1
        side1vec = side1_list[0] + side1_list[1] / 2 + side1_list[2] * 2 + side1_list[3] * 2
        if side1vec == 0:
            side1vec = 1

        success, img = cap.read()
        img = cv2.resize(img, (0, 0), None, 1, 1)
        ih, iw, channels = img.shape
        blob = cv2.dnn.blobFromImage(img, 1 / 255, (input_size, input_size), [0, 0, 0], 1, crop=False)

        # Set the input of the network
        net.setInput(blob)
        layersNames = net.getLayerNames()
        outputNames = [(layersNames[i - 1]) for i in net.getUnconnectedOutLayers()]
        # Feed data to the network
        outputs = net.forward(outputNames)
        # Find the objects from the network output
        postProcess(outputs, img, temp1, temp2, side1vec, side2vec, end_timeR, end_timeG)

        # Draw the crossing lines

        cv2.line(img, (164, 255), (314, 179), (255, 0, 255), 2)
        cv2.line(img, (314, 179), (442, 129), (0, 0, 255), 2)
        cv2.line(img, (624, 118), (695, 126), (255, 0, 255), 2)
        cv2.line(img, (695, 126), (754, 136), (0, 0, 255), 2)
        cv2.line(img, (831, 190), (690, 302), (255, 0, 255), 2)
        cv2.line(img, (690, 302), (435, 513), (0, 0, 255), 2)
        cv2.line(img, (182, 554), (134, 450), (255, 0, 255), 2)
        cv2.line(img, (134, 450), (108, 379), (0, 0, 255), 2)
        cv2.line(img, (691, 125), (132, 447), (0, 255, 255), 2)
        cv2.line(img, (310, 176), (688, 300), (0, 255, 255), 2)

        # Draw counting texts in the frame
        cv2.putText(img, "Side1", (110, 20), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color, font_thickness)
        cv2.putText(img, "Side2", (160, 20), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color, font_thickness)
        cv2.putText(img, "Side3", (210, 20), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color, font_thickness)

        cv2.putText(img, "Car:        " + str(side1_list[0]) + "     " + str(side2_list[0]) + "     " + str(
            side3_list[0]) + "     ", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                    font_thickness)
        cv2.putText(img, "Motorbike:  " + str(side1_list[1]) + "     " + str(side2_list[1]) + "     " + str(
            side3_list[1]) + "     ", (20, 60), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                    font_thickness)
        cv2.putText(img, "Bus:        " + str(side1_list[2]) + "     " + str(side2_list[2]) + "     " + str(
            side3_list[2]) + "     ", (20, 80), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                    font_thickness)
        cv2.putText(img, "Truck:      " + str(side1_list[3]) + "     " + str(side2_list[3]) + "     " + str(
            side3_list[3]) + "     ", (20, 100), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                    font_thickness)

        # Show the frames
        cv2.imshow('Output', img)

        if cv2.waitKey(1) == ord('q'):
            break

    # Write the vehicle counting information in a file and save it

    with open("data.csv", 'w') as f1:
        cwriter = csv.writer(f1)
        cwriter.writerow(['Direction', 'car', 'motorbike', 'bus', 'truck'])
        side1_list.insert(0, "LEFT-RIGHT")
        side2_list.insert(0, "UP-DOWN")
        side3_list.insert(0, "OUT")

        cwriter.writerow(side1_list)
        cwriter.writerow(side2_list)
        cwriter.writerow(side3_list)

    f1.close()
    # print("Data saved at 'data.csv'")
    # Finally realese the capture object and destroy all active windows
    cap.release()
    cv2.destroyAllWindows()


image_file = 'vehicle classification-image02.png'


def from_static_image(image):
    img = cv2.imread(image)

    blob = cv2.dnn.blobFromImage(img, 1 / 255, (input_size, input_size), [0, 0, 0], 1, crop=False)

    # Set the input of the network
    net.setInput(blob)
    layersNames = net.getLayerNames()
    outputNames = [(layersNames[i[0] - 1]) for i in net.getUnconnectedOutLayers()]
    # Feed data to the network
    outputs = net.forward(outputNames)

    # Find the objects from the network output
    postProcess(outputs, img)

    # count the frequency of detected classes
    frequency = collections.Counter(detected_classNames)
    print(frequency)
    # Draw counting texts in the frame
    cv2.putText(img, "Car:        " + str(frequency['car']), (20, 40), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                font_thickness)
    cv2.putText(img, "Motorbike:  " + str(frequency['motorbike']), (20, 60), cv2.FONT_HERSHEY_SIMPLEX, font_size,
                font_color, font_thickness)
    cv2.putText(img, "Bus:        " + str(frequency['bus']), (20, 80), cv2.FONT_HERSHEY_SIMPLEX, font_size, font_color,
                font_thickness)
    cv2.putText(img, "Truck:      " + str(frequency['truck']), (20, 100), cv2.FONT_HERSHEY_SIMPLEX, font_size,
                font_color, font_thickness)

    cv2.imshow("image", img)

    cv2.waitKey(0)

    # save the data to a csv file
    with open("static-data.csv", 'a') as f1:
        cwriter = csv.writer(f1)
        cwriter.writerow([image, frequency['car'], frequency['motorbike'], frequency['bus'], frequency['truck']])
    f1.close()


if __name__ == '__main__':
    realTime()
    # from_static_image(image_file)
