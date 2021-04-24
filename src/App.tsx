import React from "react";
import { AuditsType, CategoryType } from "./audits";
import Categories from "./components/Categories";
import ScoringRange from "./components/ScoringRange";
import "./App.css";
import ScoringHeader from "./components/ScoringHeader";
import Task from "./components/Task";

// @ts-ignore
const data: AuditsType = window.audits;
// @ts-ignore
const title = window.title;

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
      <h1 className="paper-title">
        {title}
        <ScoringRange />
      </h1>
      <Categories categories={categories} />

      {data.categories.map((c) => (
        <div key={c.type}>
          <ScoringHeader key={c.type} {...c} />
          {data.tasks
            .filter((t) => t.scoringCategory === c.type && t.score !== 100)
            .map((i) => (
              <Task key={i.meta.id} {...i} />
            ))}
        </div>
      ))}
    </div>
  );
}

export default App;
