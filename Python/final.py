# TechVidvan Vehicle counting and Classification

# Import necessary packages
import time

import cv2
import csv
import collections
import numpy as np
from tracker import *
from datetime import datetime, timedelta, date
class EuclideanDistTracker:
    def __init__(self):
        # Store the center positions of the objects
        self.center_points = {}
        # Keep the count of the IDs
        # each time a new object id detected, the count will increase by one
        self.id_count = 0


    def update(self, objects_rect):
        # Objects boxes and ids
        objects_bbs_ids = []

        # Get center point of new object
        for rect in objects_rect:
            x, y, w, h, index = rect
            cx = (x + x + w) // 2
            cy = (y + y + h) // 2

            # Find out if that object was detected already
            same_object_detected = False
            for id, pt in self.center_points.items():
                dist = math.hypot(cx - pt[0], cy - pt[1])

                if dist < 25:
                    self.center_points[id] = (cx, cy)
                    # print(self.center_points)
                    objects_bbs_ids.append([x, y, w, h, id, index])
                    same_object_detected = True
                    break

            # New object is detected we assign the ID to that object
            if same_object_detected is False:
                self.center_points[self.id_count] = (cx, cy)
                objects_bbs_ids.append([x, y, w, h, self.id_count, index])
                self.id_count += 1

        # Clean the dictionary by center points to remove IDS not used anymore
        new_center_points = {}
        for obj_bb_id in objects_bbs_ids:
            _, _, _, _, object_id, index = obj_bb_id
            center = self.center_points[object_id]
            new_center_points[object_id] = center

        # Update dictionary with IDs not used removed
        self.center_points = new_center_points.copy()
        return objects_bbs_ids



def ad(a, b):
    return a+b

def oneoneone(x):
    return ((64/441)*x + 106153/441)

def oneonetwo(x):
    return ((66/347)*x + 103902/347)
x = np.linspace(0,1,100)

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
cap = cv2.VideoCapture('Python/vd.mkv')
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


def count_vehicle(box_id, img, temp1, temp2, end_timeR, end_timeG,side1_list,side2_list,side3_list):
    x, y, w, h, id, index = box_id
    # Find the center of the rectangle for detection
    center = find_center(x, y, w, h)
    ix, iy = center
    # Find the current position of the vehicle
    color = (200, 0, 200)
    if temp1 == "green" and temp2 == "red" :#and datetime.now() < end_timeR:

        if ((iy > 547) and (iy < 719) and (ix > 282) and (ix < 659)) or (
                (iy > 127) and (iy < 215) and (ix > 721) and (ix < 872)):
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
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
    
    if temp1 == "red" and temp2 == "green": #and datetime.now() < end_timeG:
        if ((iy > 271) and (iy < 366) and (ix > 169) and (ix < 443)) or (
                (iy > 295) and (iy < 403) and (ix > 964) and (ix < 1278)):
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
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
def postProcess(outputs, img, temp1, temp2,end_timeR, end_timeG,side1_list,side2_list,side3_list):
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
        count_vehicle(box_id, img, temp1, temp2, end_timeR, end_timeG,side1_list,side2_list,side3_list)


def realTime():
    inn = 0
    while True:
        if inn == 0:
            side1_list = [0, 0, 0, 0]
            side2_list = [0, 0, 0, 0]
            side3_list = [0, 0, 0, 0]
            temp1 = "red"
            temp2 = "green"
            redtime = 40
            greentime = 80
            side1vec = 1
            side2vec = 1
            end_timeR = datetime.now() + timedelta(seconds=redtime)
            end_timeG = end_timeR + timedelta(seconds=greentime)
            inn = inn + 1
            
        side2vec = side2_list[0] + side2_list[1] / 2 + side2_list[2] * 2 + side2_list[3] * 2
        if side2vec == 0:
            side2vec = 1
        side1vec = side1_list[0] + side1_list[1] / 2 + side1_list[2] * 2 + side1_list[3] * 2
        if side1vec == 0:
            side1vec = 1
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
            side1_list = [0, 0, 0, 0]
            side2_list = [0, 0, 0, 0]
            side3_list = [0, 0, 0, 0]

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
        postProcess(outputs, img, temp1, temp2, end_timeR, end_timeG,side1_list,side2_list,side3_list)

        # Draw the crossing lines

        # Draw the crossing lines
        # 1-1
        cv2.line(img, (201, 271), (443, 305), (255, 0, 255), 2)
        cv2.line(img, (169, 332), (350, 366), (0, 0, 255), 2)
        # 1-2
        cv2.line(img, (1274, 320), (976, 295), (255, 0, 255), 2)
        cv2.line(img, (1278, 403), (964, 375), (0, 0, 255), 2)
        # 2-1
        cv2.line(img, (282, 710), (480, 547), (255, 0, 255), 2)
        cv2.line(img, (583, 719), (659, 598), (0, 0, 255), 2)
        # 2-2
        cv2.line(img, (872, 140), (822, 215), (255, 0, 255), 2)
        cv2.line(img, (771, 127), (721, 211), (0, 0, 255), 2)
        # 3-1
        cv2.line(img, (963, 379), (1271, 416), (255, 0, 255), 2)
        cv2.line(img, (926, 483), (1270, 507), (0, 0, 255), 2)
        # 3-2
        cv2.line(img, (453, 293), (204, 264), (255, 0, 255), 2)
        cv2.line(img, (535, 252), (224, 227), (0, 0, 255), 2)
        # 3-3
        cv2.line(img, (452, 544), (240, 712), (255, 0, 255), 2)
        cv2.line(img, (345, 496), (86, 664), (0, 0, 255), 2)
        # 3-4
        cv2.line(img, (827, 213), (870, 159), (255, 0, 255), 2)
        cv2.line(img, (855, 228), (917, 159), (0, 0, 255), 2)

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
