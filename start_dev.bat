:: no batch for karan and his mac :) 

@echo off

set debug=1

start cmd /k "python server.py %debug%"

cd web

start cmd /k "npm start"