#!/Python27/python
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 07 22:26:22 2017

@author: CS401:Nannapas Banluesombatkul
"""


import cgitb
cgitb.enable()

from Database import Database
import string
import random


class User: 
    __userId = None
    __username = None
    __firstname = None
    __lastName = None
    __emailAddress = None
    __phoneNumber = None
    __status = None
    __timezone = None
    __organization = None
    __position = None
    __language = None
    
    
    def __init__(self,username= None,userId= None,firstname= None,lastName= None,emailAddress= None,phoneNumber= None,status= None,organization= None,position= None,language= None,timezone= None,sessionId = None): 
        self.__username = username      
        self.__sessionId = None
        self.__userId = userId
        self.__firstname = firstname
        self.__lastName = lastName
        self.__emailAddress = emailAddress
        self.__phoneNumber = phoneNumber
        self.__status = status
        self.__organization = organization
        self.__position = position
        self.__language = language
        self.__timezone = timezone
        self.__db = Database()
        
        if self.__db.connect():
        
            if sessionId == None:
                self.__setSessionToken()
            else:
                self.__sessionId = sessionId
                
            if self.__username == None:
                #check session id and get user id
                sql = 'SELECT `user_id` FROM `session` WHERE `session_id` = "'+str(self.__sessionId)+'";'
               
                self.__db.execute(sql)
                uid = self.__db.getCursor().fetchone()
                if uid != None:
                    self.__userId = uid[0]
                
    def getUserId(self):
        return self.__userId
        
    def getUsername(self):
        return self.__username
    
    def getFirstname(self):
        return self.__firstname 
        
    def getLastName(self):
        return self.__lastName
        
    def getEmailAddress(self):
        return self.__emailAddress
        
    def getPhoneNumber(self):
        return self.__phoneNumber
        
    def getStatus(self):
        return self.__status
        
    def getOrganization(self):
        return self.__organization
        
    def getPosition(self):
        return self.__position
        
    def getLanguage(self):
        return self.__language
        
    def getTimezone(self):
        return self.__timezone
        
    def setTimezone(self, timezone):
        self.__timezone = timezone
        
        if self.__userId != None:
            sql = "UPDATE `user` SET `timezone`='"+str(self.__timezone)+"' WHERE `user_id`= '"+str(self.__userId)+"';"     
            if self.__db.execute(sql):
                self.__db.commit()
                    

        
    def __setSessionToken(self):
        self.__sessionId = self.__idGenerator()
    
        sql = "UPDATE `session` SET `session_id`='"+str(self.__sessionId)+"' WHERE `user_id`= '"+str(self.__userId)+"';"     
        if self.__db.execute(sql):
            #this userId had ever logged in before.
            self.__db.commit()
        else:
            #no entry of this userId. (login first time)
            while True:
                sql = "INSERT INTO `session`(`user_id`, `session_id`) VALUES ('"+str(self.__userId)+"','"+str(self.__sessionId)+"');"
            
                if self.__db.execute(sql):
                    #session_id is not duplicated
                    self.__db.commit()
                    break
                else:
                    #session_id is duplicated
                    self.__sessionId = self.__idGenerator()        

        
        
    def getSessionToken(self):   
        return self.__sessionId
        
        
    def __idGenerator(self,size=6, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))