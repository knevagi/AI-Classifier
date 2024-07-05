## AI Classifier

An app that classifies food images into 101 different food classes using a Flask backend and Next.js frontend.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)

## Overview

The AI Classifier app is designed to accurately classify food images into 101 different food classes. It uses a Flask backend to serve the machine learning model and a Next.js frontend for a seamless user experience.

The app has two main components:

1. **Server**: The server folder contains the Flask backend code. To start the server, run `python server.py` in the server directory.

2. **App**: The app folder contains the Next.js frontend code. After starting the server, build the Next.js app to classify food images.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/knevagi/AI-Classifier.git
```

2. Install the required dependencies for the Flask backend:

```bash
cd AI-Classifier/server
pip install -r requirements.txt
```

3. Install the required dependencies for the Next.js frontend:

```bash
cd AI-Classifier/app
npm install
```

## Usage

1. Start the Flask server:

```bash
cd AI-Classifier/server
python server.py
```

2. Build the Next.js app:

```bash
cd app
npm run build
```

3. The app will be available at `http://localhost:3000`. Upload an image of food and the app will classify it into one of the 101 food classes.
