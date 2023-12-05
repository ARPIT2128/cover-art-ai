from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
from PIL import Image
import io
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from transformers import AutoTokenizer
import random
import uuid

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Mount the images directory at the specified path
app.mount("/images", StaticFiles(directory=os.path.join(os.getcwd(), "saved")), name="images")

# Allow all origins during development; you may want to restrict this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputText(BaseModel):
    text: str

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"
HEADERS = {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json",
}

SAVE_PATH = os.path.join(os.getcwd(), "saved")

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("gpt2")

@app.post("/api/get_cover_art")
async def get_cover_art(input_text: InputText):
    try:
        # Introduce variability in input text
        input_text_with_suffix = f"Album Cover,Art,music album cover,{input_text.text}___{uuid.uuid4()}"

        # Tokenize the input text
        tokenized_input = tokenizer(input_text_with_suffix, return_tensors="pt")

        # Convert the tokenized values back to string
        input_str = tokenizer.decode(tokenized_input["input_ids"][0])

        payload = {"inputs": input_str}
        response = requests.post(API_URL, headers=HEADERS, json=payload, stream=True)
        response.raise_for_status()

        if response.content:
            # Use a UUID to ensure a unique filename
            unique_id = uuid.uuid4()
            image_filename = f"{unique_id}.jpeg"
            image_path = os.path.join(SAVE_PATH, image_filename)

            # Save the image
            image = Image.open(io.BytesIO(response.content))
            image.save(image_path, format="JPEG")

            # Log the generated filename
            logging.debug(f"Generated filename: {image_filename}")

            # Return the relative path to the saved image with Cache-Control header
            return FileResponse(image_path, headers={"Cache-Control": "no-cache"})
        else:
            raise HTTPException(status_code=500, detail="Empty response from Hugging Face API")
    except requests.RequestException as e:
        logging.error(f"Error in making request to Hugging Face API: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
