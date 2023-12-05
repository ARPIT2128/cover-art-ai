# Album Cover AI

Album Cover AI is a web application that leverages Hugging Face's Stable Diffusion 2.1 model to create unique album cover art based on user input. This repository contains both frontend and backend code for the application.

## Features

- Generate distinctive album cover art from user-provided text.
- Save the generated album cover art locally.

## Technologies Used

- [FastAPI](https://fastapi.tiangolo.com/): A modern, high-performance web framework for building APIs with Python 3.7+.
- [React](https://reactjs.org/): A JavaScript library for constructing user interfaces.
- [axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
- [Hugging Face](https://huggingface.co/): Offers a vast collection of pre-trained models for natural language processing and computer vision.

## Getting Started

### Prerequisites

- [Python 3.7+](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/)

### Installation

#### Backend

1. Navigate to the `backend` directory.

    ```bash
    cd backend
    ```

2. Install dependencies.

    ```bash
    pip install -r requirements.txt
    ```

3. Run the FastAPI server.

    ```bash
    uvicorn main:app --reload
    ```

#### Frontend

1. Navigate to the `frontend` directory.

    ```bash
    cd frontend
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Run the React app.

    ```bash
    npm run dev
    ```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the application.

## Usage

1. Enter text in the input field on the frontend.
2. Click the "Search" button to generate album cover art.
3. The generated album cover art will be displayed below.

## Folder Structure

- `backend`: Contains the FastAPI backend code.
- `frontend`: Contains the React frontend code.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
