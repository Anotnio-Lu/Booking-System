const Distance = ({ leg }) => {
  if (!leg.distance || !leg.duration) return null;

  return (
    <div>
      <p>
        This destination is <span className="highlight">{leg.distance.text}</span> away. That would take{" "}
        <span className="highlight">{leg.duration.text}</span> to reach that direction.
      </p>

    </div>
  );
};

export default Distance;
