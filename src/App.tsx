import React from "react";
import { CategoryType } from "./audits";
import data from "./audits.json";
import Categories from "./components/Categories";
import "./App.css";
import ScoringHeader from "./components/ScoringHeader";
import TaskDetail from "./components/TaskDetail";

function App() {
  const categories: CategoryType[] = [
    {
      type: "summary",
      text: "总分",
      score: data.score,
      level: data.level,
    },
    ...data.categories,
  ];

  return (
    <div className="paper">
      <h1
        style={{
          fontSize: 24,
          textAlign: "center",
          marginBottom: 20,
          paddingBottom: 20,
        }}
      >
        体验评分
      </h1>
      <Categories categories={categories} />

      {data.categories.map((i) => (
        <ScoringHeader {...i} />
      ))}
      <TaskDetail headings={data.tasks[20].headings} details={data.tasks[20].details} />
    </div>
  );
}

export default App;
