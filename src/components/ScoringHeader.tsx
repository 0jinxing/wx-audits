import React, { FC } from "react";
import classNames from "classnames";
import { CategoryType } from "../audits";
import { CATEGORY_TITLE } from "../constants/category";
import { scoreToLevel } from "../constants/colors";
import "./ScoringHeader.css";

const ScoringHeader: FC<CategoryType> = (props) => {
  const subTitle = CATEGORY_TITLE[props.type];
  return (
    <header
      className={classNames(
        "scoring-header",
        scoreToLevel(props.score).toLowerCase()
      )}
    >
      <h2 className="scoring-title">
        {props.text} {props.score}
      </h2>
      {subTitle && <p className="scoring-sub-title">{subTitle}</p>}
    </header>
  );
};

export default ScoringHeader;
