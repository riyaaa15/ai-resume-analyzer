

const ResumeInput = ({ resume, handleResumeChange }) => {
    return (
        <div>
            <label className="input-label">Resume</label>
            <textarea className="input-textarea"
              name="resume" 
              id="resume"
              placeholder="Paste your Resume here..."
              value={resume}
              onChange={handleResumeChange}
            />
        </div>
    )
} 

export default ResumeInput;