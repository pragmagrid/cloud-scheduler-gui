#!/opt/python/bin/python
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 16 22:17:23 2017

@author: CS401:Nannapas Banluesombatkul
"""

import cgitb
cgitb.enable()


import cgi
form = cgi.FieldStorage()


###variable from front-end###
RESOURCES = form.getvalue('resources')
CONNECTION_TYPE = form.getvalue('connection_type')
IMAGE_TYPE = form.getvalue('image_type')
BEGIN = form.getvalue('begin')
END = form.getvalue('end')
ALL_PERIOD = form.getvalue('all_period')
DAYS = form.getvalue('days')
HOURS = form.getvalue('hours')
#############################


print "Content-Type: text/html"     
print "Access-Control-Allow-Origin: *"  
print



#prepare connection criteria
if "None" in CONNECTION_TYPE:
    CONNECTION_TYPE = None
    
#prepare all_period criteria
if ALL_PERIOD != True and ALL_PERIOD != False and "True" in ALL_PERIOD:
    ALL_PERIOD = True
elif ALL_PERIOD != True and ALL_PERIOD != False and "False" in ALL_PERIOD:
    ALL_PERIOD = False


#prepare criteria about resources
resourcesAmt = []
if RESOURCES != None:
    spl = RESOURCES.split(',')
    for s in spl:
        resourcesAmt.append(s)


#prepare criteria about days and hours
if ALL_PERIOD:
    if DAYS == None:
        DAYS = 0
    if HOURS == None:
        HOURS = 0


from SiteManager import SiteManager
siteManager = SiteManager()
sites = siteManager.getSites(resAmount=resourcesAmt,connectionType=CONNECTION_TYPE, imageType=IMAGE_TYPE, begin=BEGIN, end=END, allPeriod=ALL_PERIOD, days=DAYS, hours=HOURS)


jsonStr = '{ "result_type" : "' + str(siteManager.getResultType()) + '", '

jsonStr += '"amount" : "'+str(len(sites))+'"'

jsonStr += ', "sites" : ['
for s in sites:
    jsonStr += '{"id" : "'+str(s.getSiteId())+'",'
    jsonStr += '"name" : "'+str(s.getName())+'",'
    jsonStr += '"description" : "'+str(s.getDescription())+'",'
    jsonStr += '"contact" : "'+str(s.getContact())+'",'
    jsonStr += '"location" : "'+str(s.getLocation())+'",'
    jsonStr += '"pragma_boot_path" : "'+str(s.getPragmaBootPath())+'",'
    jsonStr += '"pragma_boot_version" : "'+str(s.getPragmaBootVersion())+'",'
    jsonStr += '"python_path" : "'+str(s.getPythonPath())+'",'
    jsonStr += '"temp_dir" : "'+str(s.getTempDir())+'",'
    jsonStr += '"username" : "'+str(s.getUsername())+'",'
    jsonStr += '"deployment_type" : "'+str(s.getDeploymentType())+'",'
    jsonStr += '"site_hostname" : "'+str(s.getSiteHostname())+'",'
    jsonStr += '"latitude" : "'+str(s.getLatitude())+'",'
    jsonStr += '"longitude" : "'+str(s.getLongitude())+'",'

    #get site's image type
    jsonStr += '"image_type" : ['
    for img in s.getImageType():
        jsonStr += '{"name" : "'+str(img)+'"},'
        
    if len(s.getImageType()) != 0:
        jsonStr = jsonStr[:-1]        
    jsonStr += '],'
    
    
    #get site's connection type
    jsonStr += '"connection_type" : ['
    for con in s.getConnectionType():
        jsonStr += '{"name" : "'+str(con)+'"},'
    
    if len(s.getConnectionType()) != 0:
        jsonStr = jsonStr[:-1]
    jsonStr += '],'
    
    
    #get site's resources    
    for r in s.getResources():
        jsonStr += '"'+ str(r.getType()) + '" : {'
        jsonStr += '"total" : "'+str(r.getTotal())+'",'
        jsonStr += '"available" : "'+str(r.getAvailableAmount())+'"},'
    

    #get available time
    jsonStr += '"time" : {'
    jsonStr += '"begin" : "'+ str(s.getBeginAvailable())+'",'
    jsonStr += '"end" : "'+str(s.getEndAvailable())+'"},'
    
        
    jsonStr = jsonStr[:-1]
    jsonStr += '},'
    
    
    
if len(sites) !=0:
    jsonStr = jsonStr[:-1]    
jsonStr += ']}'

print jsonStr
