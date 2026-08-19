const ScoreCard = ({ score }) => {
  
  const getColor = () => {
    if (score === 100) return '#a78bfa';
    if (score >= 80) return '#34d399';
    if (score >= 51) return '#f97316';
    return '#f87171';
  }

  return (
    <div>
      <h2 className="score" style={{ color: getColor() }}>
        ATS Score: {score}%
      </h2>
      {score === 100 && <p className="perfect-score">🎉 Perfect match! Your resume is a great fit for this job.</p>}
      {score >= 70 && score < 100 && <p className="good-score">✅ Good match! Minor improvements needed.</p>}
      {score < 70 && <p className="low-score">⚠️ Low match. Consider adding missing skills.</p>}
    </div>
  )
}

export default ScoreCard;