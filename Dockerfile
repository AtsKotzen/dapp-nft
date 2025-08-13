FROM mongo:latest

EXPOSE 27017

# Create a directory for MongoDB data
RUN mkdir -p /data/db

# Set permissions for the MongoDB data directory
RUN chown -R mongodb:mongodb /data/db
