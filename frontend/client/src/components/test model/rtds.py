# -*- coding: utf-8 -*-

import socket
import time
import struct
import json

# TCP_IP = '10.16.28.92'
# TCP_PORT = 4575
# BUFFER_SIZE = 1024

# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# s.connect((TCP_IP, TCP_PORT))

# start = time.perf_counter()
i=1
while i<100:
    # recv_data_str = s.recv(BUFFER_SIZE)
    # recv_data_str_unpacked = struct.unpack('>ff',recv_data_str)
    j = float(1.034)
    t = float(2.098)
    data = { "j": j, "t": t }
    json_string = json.dumps(data)
    print(json_string)
    i+=1
    # print ("The j returned is: ", j*1000000000)
    # print ("The t returned is: ", t*1000000000)
    time.sleep(0.1)   #This sleep is needed for the ClosePort() below

s.close()
# print ('All iterations complete.')
# finish = time.perf_counter() - start
# print ('The execution time is %fs.' %finish)