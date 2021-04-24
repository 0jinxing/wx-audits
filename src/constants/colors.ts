export const SUCCESS_COLOR = "#52c41a";
export const WARNING_COLOR = "#1890ff";
export const ERROR_COLOR = "#faad14";

export const LEVEL_COLORS: Record<string, string | undefined> = {
  ["A"]: SUCCESS_COLOR,
  ["B"]: WARNING_COLOR,
  ["C"]: WARNING_COLOR,
  ["D"]: ERROR_COLOR,
};

export const scoreToLevel = (score: number) => {
  if (score >= 90) return "A";
  if (score >= 60) return "C";
  return "D";
};
