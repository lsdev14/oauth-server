# Base image:
FROM node:6.11.4
 
RUN wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh

ENV NODEJS_ROOT /home/application
 
# Set working directory, where the commands will be ran:
WORKDIR $NODEJS_ROOT