import { useState } from 'react'
import './App.css'
import ResumeInput from './components/ResumeInput';
import JobDescInput from './components/JobDescInput';
import MissingSkills from './components/MissingSkills';
import AiSuggestions from './components/AISuggestions';
import ScoreCard from './components/ScoreCard';

function App() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(0);
  const [missing, setMissing] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResumeChange = (e) => {
    setResume(e.target.value);
  }

  const handleJobDescChange = (e) => {
    setJobDesc(e.target.value);
  }

  const handleAnalyze = async () => {
    if (resume.trim() === "" || jobDesc.trim() === "") {
      alert("Please enter both Resume and Job Description");
      return;
    } 
    calculateATS();
    await getAISuggestions();
  }

  const calculateATS = () => {
    let resumeWords = resume
    .toLowerCase()
    .replace(/node\.?js/g, "nodejs")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(word => word !== "");

    let jdWords = jobDesc
    .toLowerCase()
    .replace(/node\.?js/g, "nodejs")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(word => word !== "");

    const stopWords = [
     "the", "is", "a", "an", "for", "to", "in", "on", "and", "of", "with", "at", "by", "from", "or", "but",
     "looking", "have", "know", "should", "must", "will", "can", "need", "work", "use", "used", "using",
    "skilled", "skill", "developer", "web", "experience", "experienced", "good", "strong", "team", "ability",
    "knowledge", "understanding", "familiar", "proficient", "excellent", "preferred", "required", "plus"
    ];

    jdWords = jdWords.filter(word => !stopWords.includes(word));

    const uniqueJD = [...new Set(jdWords)];  

    let matchCount = 0;
    for(const word of uniqueJD) {
      if(resumeWords.includes(word)) {
        matchCount++;
      }
    }

    const missingWords = uniqueJD.filter(
      word => !resumeWords.includes(word) && word.length > 2 && isNaN(word)
    );
    setMissing(missingWords);

    const atsSCore  = Math.round((matchCount / uniqueJD.length) * 100);
    setScore(atsSCore);
    setShowResult(true);
  }

  const getAISuggestions = async () => {
    setIsLoading(true);
    setAISuggestions("");

    try {
      const response = await fetch(
         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
         {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Analyze this resume and job description. Give a SHORT and concise response with:
                    1. Most important missing skills (if any)
                    2. Most important improvements needed (if any)
                    If the resume is a strong match, say so briefly.
                    Keep it brief and to the point. Max 150 words.
                    Resume: ${resume}
                    Job Description: ${jobDesc}`
                  }]
              }]
          }),
         }
      );

      const data = await response.json();

      if (!data.candidates) {
        setAISuggestions("Something went wrong. Please try again.");
        return;
      }

      const aiText = data.candidates[0].content.parts[0].text;
      setAISuggestions(aiText);

    } catch (error) {
      setAISuggestions("Error fetching AI suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Resume Analyzer</h1>
      <p className="subtitle">Analyze your resume against any job description</p>

       <div className="input-grid">
        <ResumeInput resume={resume} handleResumeChange={handleResumeChange} />
        <JobDescInput jobDesc={jobDesc} handleJobDescChange={handleJobDescChange} />
       </div>

       <button className="analyze" onClick={handleAnalyze}>
        {isLoading ? "Analyzing..." : "Analyze"}
       </button>

       {showResult && (
        <>
          <ScoreCard score={score}/>
          <MissingSkills missing={missing}/>
          <AiSuggestions isLoading={isLoading} aiSuggestions={aiSuggestions} />
        </>
       )}
    </div>
  )
}

export default App
