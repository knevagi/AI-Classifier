# Use the official Python image from the Docker Hub
FROM python:3.13-rc-bookworm

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Specify the command to run the app
CMD ["python", "server.py"]

# Expose the port the app runs on
EXPOSE 5000