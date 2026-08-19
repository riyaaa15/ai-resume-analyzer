const MissingSkills = ({ missing }) => {
    if( missing.length === 0) return null;
    return (
        <div>
            <h3 className="missing">Missing Skills</h3>
            <ul className="list">
                {missing.map((word) => (
                    <li className="list-item" key={word}>{word}</li>
                ))}
            </ul>
        </div>
    )
}

export default MissingSkills