import ReactMarkdown from 'react-markdown';

const AiSuggestions = ({ isLoading,aiSuggestions }) => {
    return(
        <div>
            <h3 className="ai-suggestions-title">AI Suggestions</h3>
            {isLoading ? (
                <p>Loading AI suggestions...</p>
            ) : (
                <div className="ai-suggestions-box">
                    <ReactMarkdown>{aiSuggestions}</ReactMarkdown>
                </div>
            )}
        </div>
    )
}

export default AiSuggestions;