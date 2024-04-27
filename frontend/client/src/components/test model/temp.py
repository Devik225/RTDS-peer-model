# print("Hello I am RTDS")
# import sys
# print("Welcome to ", str(sys.argv[1]))

import socket
import time
import struct
import json

TCP_IP = '10.16.28.92'
TCP_PORT = 4575
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))

start = time.perf_counter()
for i in range(1,10000):
 f = float(i) + 0.15
 send_data_str = struct.pack('>if',i, f)
 s.send(send_data_str)
 recv_data_str = s.recv(BUFFER_SIZE)
 recv_data_str_unpacked = struct.unpack('>if',recv_data_str)
 j = int(recv_data_str_unpacked[0])
 t = float(recv_data_str_unpacked[1])
 data = { "j": j, "t": t }
 json_string = json.dumps(data)
 print(json_string)
#  print(recv_data_str_unpacked)
#  print ("The j returned is: ", j)
#  print ("The t returned is: ", t)
 time.sleep(1) #This sleep is needed for the ClosePort() below

s.close()
print ('All iterations complete.')
finish = time.perf_counter() - start
print ('The execution time is %fs.' %finish)

# for i in range(100):
#     print("I am devik")
#     time.sleep(1)

