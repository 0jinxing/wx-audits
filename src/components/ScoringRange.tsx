import React, { FC } from "react";
import { ERROR_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "../constants/colors";
import "./ScoringRange.css";

const RANGE = [
  { label: "0-59", color: ERROR_COLOR },
  { label: "60-89", color: WARNING_COLOR },
  { label: "90-100", color: SUCCESS_COLOR },
];

const ScoringRange: FC = () => {
  return (
    <div className="scoring-range">
      {RANGE.map((i) => (
        <div key={i.color} className="scoring-range-item">
          <i className="scoring-range-color" style={{ background: i.color }} />
          {i.label}
        </div>
      ))}
    </div>
  );
};

export default ScoringRange;
