// index.js
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import styled from "@emotion/styled";
import styles from "../styles/Home.module.css";
import ParticleCanvas from "./ParticleCanvas";
import ImageSlider from "./ImageSlider";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledContainer = styled(Container)({
  position: "relative",
  textAlign: "center",
  marginTop: "50px",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  zIndex: 1,
});

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageCounter, setImageCounter] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const images = [
    {
      src: "./1.jpg",
      altText: "Image 1 Description",
    },
    {
      src: "./2.jpg",
      altText: "Image 2 Description",
    },
    {
      src: "./3.jpg",
      altText: "Image 3 Description",
    },
    {
      src: "./4.jpg",
      altText: "Image 3 Description",
    },
    {
      src: "./5.jpg",
      altText: "Image 3 Description",
    },
  ];

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      setImageCounter((prevCounter) => prevCounter + 1);

      const apiUrl = `http://localhost:8000/api/get_cover_art?cacheBuster=${Date.now()}&random=${Math.random()}&counter=${imageCounter}`;

      const response = await axios.post(
        apiUrl,
        { text: inputText },
        { responseType: "arraybuffer" }
      );
      setImageSrc(
        URL.createObjectURL(
          new Blob([response.data], { type: response.headers["content-type"] })
        )
      );
    } catch (error) {
      console.error("API Request Error:", error.message);
      setError("An error occurred while fetching the data.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = `cover_art_${new Date().getTime()}.jpeg`;
    link.click();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div>
        <ParticleCanvas />
        <Typography variant="h4" className={styles.heading}>
          Cover Art AI
        </Typography>
        <ImageSlider images={images} />
        <StyledContainer maxWidth="sm">
          <TextField
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={styles.input}
            variant="outlined"
            label="Enter Text"
            fullWidth
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className={styles.button}
            variant="contained"
            color="primary"
          >
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>

          {loading && <p className={styles.loading}>Loading...</p>}
          {error && (
            <Alert severity="error" className={styles.error}>
              {error}
            </Alert>
          )}

          {imageSrc && (
            <div className={styles.resultContainer}>
              <Typography variant="h5" className={styles.resultHeading}>
                Result:
              </Typography>
              <img
                src={imageSrc}
                alt={`Cover Art for ${inputText}`}
                className={styles.resultImage}
              />
              <Button
                onClick={handleDownload}
                className={styles.downloadButton}
                variant="outlined"
                color="primary"
              >
                Download Image
              </Button>
            </div>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
        </StyledContainer>
      </div>
    </>
  );
}
