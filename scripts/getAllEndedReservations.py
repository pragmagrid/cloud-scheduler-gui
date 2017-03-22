#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 16 19:25:40 2017

@author: bamboojfc
"""


import cgitb
cgitb.enable()


###variable from front-end###
SESSION_ID = 'ACB123'
#############################

print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print

from ReservationManager import ReservationManager

resManager = ReservationManager()
reservations = resManager.getAllReservations(sessionId = SESSION_ID, ended = True)

jsonStr = '{ "result" : [' 

for i in range(0,len(reservations)):
    for j in range(0,len(reservations[i])):
        r = reservations[i][j]
        jsonStr += ' { "reservation_id" : "'+str(r.getReservationId())+'", '
        jsonStr += '"title" : "'+str(r.getTitle())+'", '
        jsonStr += '"description" : "'+str(r.getDescription())+'", '
        jsonStr += '"begin" : "'+str(r.getStart())+'", '
        jsonStr += '"end" : "'+str(r.getEnd())+'", '
        jsonStr += '"owner" : "'+str(r.getOwner())+'", '
        jsonStr += '"image_type" : "'+str(r.getImageType())+'", '
        jsonStr += '"sites" : ['
        
        sites = r.getReservationsSite()
        for s in sites:
            jsonStr += ' { "site_name" : "'+str(s.getName())+'", '
            
            for r in s.getResources():
                jsonStr += '"'+str(r.getType())+'" : "'+str(r.getAmount())+'" ,'
            
            jsonStr += '"status" : "'+str(s.getStatus())+'" },'
        
        jsonStr = jsonStr[:-1]    
        jsonStr += ']' #end sites
        
        jsonStr += '},' #end one reservation
        

if len(reservations) > 0 and len(reservations[0]) > 0 :
    jsonStr = jsonStr[:-1] 

jsonStr += '] }'
print jsonStr