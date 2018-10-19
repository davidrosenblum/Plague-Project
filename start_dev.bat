:: no batch for karan and his mac :) 

@echo off

start cmd /k "python server.py %DEBUG=1%"

cd web

start cmd /k "npm start"