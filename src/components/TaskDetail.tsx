import { Table } from "antd";
import React, { FC } from "react";
import { TaskDetailType, TaskHeadingType, TaskStackType } from "../audits";

function isStack(data: unknown): data is TaskStackType {
  if (Array.isArray(data)) {
    return !data.length || "func" in data[0];
  }
  return false;
}

const TaskDetail: FC<{
  details: TaskDetailType[];
  headings: TaskHeadingType[];
}> = (props) => {
  const columns = props.headings.map((h, index) => ({
    title: h.text,
    dataIndex: h.key,
    key: h.key,
    render: (data: string | number | string[] | number[]) => {
      if (h.key === "stack" && isStack(data)) {
        return data
          .map((i) => `at ${i.func}(${i.file}:${i.line}:${i.column})`)
          .join("; ");
      }
      if (Array.isArray(data)) {
        return data.join("; ");
      }
      return data;
    },
  }));

  return (
    <Table
      size="small"
      sticky
      pagination={false}
      columns={columns}
      dataSource={props.details}
    />
  );
};

export default TaskDetail;
