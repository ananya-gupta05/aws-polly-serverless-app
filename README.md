# 🎙️ Serverless Text-to-Speech Web Application (AWS Polly)

## 🚀 Overview
A fully serverless web application that converts TXT and PDF files into speech using Amazon Polly.

This project demonstrates a modern cloud-native architecture using AWS managed services.

Users can:
- Upload a `.txt` or `.pdf` file
- Convert extracted text into speech
- Stream the generated MP3
- Download the audio file

---

## 🏗️ Architecture

### Frontend Layer
- Amazon S3 (Static Website Hosting)
- Amazon CloudFront (CDN with HTTPS)

### Backend Layer
- Amazon API Gateway (HTTP API)
- AWS Lambda (Python)
- Amazon Polly (Text-to-Speech)
- Amazon CloudWatch (Monitoring & Metrics)

### Flow

User (Browser)  
→ CloudFront  
→ S3 (HTML/CSS/JS)  

User  
→ API Gateway (POST /narrate)  
→ Lambda  
→ Amazon Polly  
→ Lambda  
→ API Gateway  
→ Browser (MP3 stream)

---

## 🧠 Key Concepts Implemented

- Serverless architecture
- Binary response handling via API Gateway
- Base64 encoding for audio streaming
- CORS configuration
- CloudFront + S3 static hosting
- CloudWatch metrics monitoring (Polly character usage)
- IAM role configuration for service permissions

---

## 🛠️ Tech Stack

Frontend:
- HTML
- CSS
- JavaScript
- PDF.js

Backend:
- Python (AWS Lambda)
- Amazon Polly
- API Gateway (HTTP API)

Cloud Services:
- Amazon S3
- Amazon CloudFront
- AWS Lambda
- Amazon API Gateway
- Amazon Polly
- Amazon CloudWatch

Region:
ap-south-1 (Mumbai)

---

## 📦 Features

✔ Drag & Drop file upload  
✔ Click-to-upload support  
✔ PDF text extraction  
✔ Real-time MP3 streaming  
✔ Download generated audio  
✔ Fully serverless — no EC2 or servers  

---

## 📊 Monitoring

Polly usage tracked via:

CloudWatch → Metrics → RequestCharacters

---

## 🔐 Security

- IAM Role with scoped permissions for Lambda
- API Gateway CORS configuration
- CloudFront HTTPS delivery

---

## 🎯 Learning Outcomes

This project demonstrates:

- Designing and implementing a complete serverless application
- Handling binary data in API Gateway
- Integrating AI services (Amazon Polly)
- Debugging CORS and Lambda invocation permissions
- Deploying static frontend via CDN

---

## 👩‍💻 Author
Ananya Gupta
