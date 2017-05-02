#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 08 23:54:20 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()


from Database import Database
from Site import Site


class Reservation:
    
    def __init__(self,d):
        self.__sites=[]
        self.setReservationId(d[0])
        self.setTitle(d[1])
        self.setDescription(d[2])
        self.setStart(d[3])
        self.setEnd(d[4])
        self.setImageType(d[5])
        self.setType(d[6])
    
    def setReservationId(self, reservationId):
        self.__reservationId = reservationId
        
    def getReservationId(self):
        return self.__reservationId
           
    def setTitle(self,title):
        self.__title = title
        
    def getTitle(self):
        return self.__title
        
    def setDescription(self, description):
        self.__description = description
        
    def getDescription(self):
        return self.__description 
        
    def setStart(self, start):
        self.__start = start
        
    def getStart(self):
        return self.__start 
        
    def setEnd(self, end):
        self.__end = end
        
    def getEnd(self):
        return self.__end
        
    def setImageType(self, imageType):
        self.__imageType = imageType
        
    def getImageType(self):
        return self.__imageType
        
      
    def setReservationsSite(self):
        self.__db = Database()
        if self.__db.connect():
            sql = 'SELECT * FROM `site_reserved` WHERE `reservation_id` = "'+str(self.__reservationId)+'"'
            self.__db.execute(sql)
            data = self.__db.getCursor().fetchall() 
            
            for d in data:
                siteId = d[1]
                s = Site(site_id = siteId)
                s.setStatus(d[2])
                       
                #create site just for getting the amount of resource types
                self.__db.execute('SELECT * FROM `site` WHERE `site_id` = "'+str(siteId)+'";')
                site_data = self.__db.getCursor().fetchone()   
                site = Site(site_data) 
                r = site.getResources()
                
                for i in range(0,len(r)):
                    #d[2] = CPU, d[3] = Memory
                    r[i].setAmount(d[3+i])
                    
                s.setResources(r)
                
                self.__db.execute('SELECT `name` FROM `site` WHERE `site_id`="'+str(siteId)+'"')            
                s.setName(self.__db.getCursor().fetchone()[0])
                self.__sites.append(s)
                
        
    def getReservationsSite(self):
        return self.__sites
        
    def setOwner(self, owner):
        self.__owner = owner
        
    def getOwner(self):
        return self.__owner
        
    def setType(self, reserveType):
        self.__reserveType = reserveType
        
    def getType(self):
        return self.__reserveType
        
        