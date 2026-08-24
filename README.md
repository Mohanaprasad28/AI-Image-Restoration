# AI Image Restoration

An AI-powered image restoration application designed to enhance and restore degraded images using deep learning-based image processing techniques.

## ✨ Features

* 🖼️ Image restoration and enhancement
* 📤 Image upload and processing
* 🔄 Batch image processing
* 📊 Restoration quality metrics
* 📈 Live analytics and restoration history
* 🎨 Clean and responsive web interface
* 🌐 Multi-language interface support
* 📥 Download restored images
* ⚙️ Model information and configuration
* 🐍 Python backend for image-processing operations

## 🧠 Project Overview

Old, damaged, noisy, or low-quality images often suffer from degradation such as noise, blur, missing details, and reduced visual quality.

This project provides a web-based interface for restoring degraded images with AI-assisted image processing. The application combines a modern React frontend with a Python backend to provide an interactive restoration workflow.

## 🏗️ System Architecture

```text
User
  │
  ▼
React + Vite Frontend
  │
  ├── Image Upload
  ├── Restoration Controls
  ├── Quality Metrics
  ├── Batch Processing
  └── Results & Analytics
  │
  ▼
Python Backend
  │
  └── Image Restoration Pipeline
  │
  ▼
Restored Image
  │
  ├── Preview
  ├── Quality Analysis
  └── Download
```

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript / JSX
* HTML5
* CSS3

### Backend

* Python
* FastAPI
* REST API

### AI / Image Processing

* Deep Learning-based image restoration
* SwinIR-based restoration components
* NumPy
* Image quality evaluation

## 📁 Project Structure

```text
AI-Image-Restoration/
│
├── backend/
│   ├── api.py
│   └── requirements.txt
│
├── src/
│   ├── components/
│   ├── data/
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   └── main.jsx
│
├── results/
│   ├── npy/
│   └── plots/
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mohanaprasad28/AI-Image-Restoration.git
cd AI-Image-Restoration
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

## ▶️ Running the Application

### Start the Backend

From the project root:

```bash
cd backend
uvicorn api:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

### Start the Frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend will be available at the local development URL shown by Vite.

## 📊 Results

The project stores generated restoration outputs and visualization results inside the `results/` directory.

These results can be used to compare input images with restored outputs and evaluate restoration quality.

## 🔐 Dataset & Model Files

Large datasets, checkpoints, model archives, and generated development files are intentionally excluded from this GitHub repository using `.gitignore`.

This keeps the repository lightweight and makes it easier to clone and develop.

## 🚀 Future Enhancements

* Improve restoration quality for severely degraded images
* Add more restoration models
* Add GPU acceleration support
* Improve image quality evaluation
* Add cloud-based model inference
* Deploy the application for public use
* Add additional image restoration tasks

## 👨‍💻 Author

**Mohanaprasad**

GitHub:
https://github.com/Mohanaprasad28

## 📄 License

This project is intended for educational and research purposes.
