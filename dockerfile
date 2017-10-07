# Base image:
FROM node:6.11.4
 
ENV NODEJS_ROOT /home/application
 
# Set working directory, where the commands will be ran:
WORKDIR $NODEJS_ROOT