import { Progress } from "antd";
import React, { FC } from "react";
import { CategoryType } from "../audits";
import { LEVEL_COLORS } from "../constants/colors";
import "./Categories.css";

const CategoryItem: FC<CategoryType> = (props) => {
  return (
    <div className="category-item">
      <Progress
        type="circle"
        width={80}
        percent={props.score}
        format={(i) => i}
        strokeColor={LEVEL_COLORS[props.level]}
      />
      <span className="category-text">{props.text}</span>
    </div>
  );
};

const Categories: FC<{ categories: CategoryType[] }> = (props) => {
  return (
    <div className="categories">
      {props.categories.map((i) => (
        <CategoryItem {...i} key={i.type} />
      ))}
    </div>
  );
};

export default Categories;
