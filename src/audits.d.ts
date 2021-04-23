export type LevelType = "A" | "B" | "C" | "D" | string;

export type CategoryType = {
  type: string;
  text: string;
  score: number;
  level: LevelType;
};

export type TaskMetaType = {
  id: string;
  passedTitle: string;
  failedTitle: string;
  description: string;
  document: string;
};

export type TaskHeadingType = {
  key: string;
  text: string;
};

export type TaskStackType = Array<{
  func: string;
  file: string;
  line: number;
  column: number;
}>;

export type TaskDetailType = Record<
  string,
  string | number | boolean | string[] | number[] | TaskStackType
>;

export type TaskType = {
  meta: TaskMetaType;
  weight: number;
  scoreDisplayMode: "numeric" | "not-applicable" | "not-accurate" | string;
  scoringCategory: "best-practice" | "performance" | "accessibility" | string;
  status: "failed" | "passed" | string;
  title: string;
  headings: TaskHeadingType[];
  details: TaskDetailType[];
  score: number;
  failedSummary: string;
};

export type AuditsType = {
  isGameApp: boolean;
  score: number;
  level: LevelType;
  tasks: TaskType[];
  categories: CategoryType[];
};
