# AI Resume Analyzer

A React app that analyzes your resume against a job description using keyword matching and Google Gemini AI to give you an ATS score and improvement suggestions.

## Features
- Paste your resume and job description to get an instant ATS score
- Color-coded score — green for good match, orange for low match, purple for perfect
- Shows missing keywords from your resume
- AI-powered suggestions using Google Gemini 2.5 Flash API
- Clean dark themed UI

## Tech Stack
- React + Vite
- Google Gemini 2.5 Flash API
- react-markdown

## Setup

1. Clone the repo
```bash
git clone https://github.com/riyaaa15/ai-resume-analyzer.git
cd ai-resume-analyzer
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root


4. Run the app
```bash
npm run dev
```

## API
Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)