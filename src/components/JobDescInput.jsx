const JobDescInput = ( { jobDesc, handleJobDescChange }) => {
    return(
        <div>
            <label className="input-label">Job Description</label>
            <textarea className="input-textarea"
              name="job-desc" 
              id="job-desc"
              placeholder="Paste job Description here..."
              value={jobDesc}
              onChange={handleJobDescChange}
            />
        </div>
    )
}

export default JobDescInput;