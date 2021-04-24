import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
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
  const columns: ColumnsType<any> = props.headings
    .filter((h) =>
      props.details.some((i) => {
        const item = i[h.key];
        if (Array.isArray(item)) {
          return item.length;
        }
        return item;
      })
    )
    .map((h) => ({
      title: h.text,
      dataIndex: h.key,
      key: "key",
      ellipsis: h.key !== "stack" && h.key !== "page",
      render: (data: string | number | string[] | number[]) => {
        if (h.key === "stack" && isStack(data)) {
          return (
            <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
              {data
                .map((i) => `at ${i.func}(${i.file}:${i.line}:${i.column})`)
                .join("; ")}
            </div>
          );
        }
        if (Array.isArray(data)) {
          return data.join("; ");
        }
        if (h.type === "richtext") {
          return (
            <div
              style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: data + "" }}
            />
          );
        }
        return (
          <div style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
            {data}
          </div>
        );
      },
    }));

  return (
    <Table
      size="small"
      bordered
      pagination={false}
      columns={columns}
      dataSource={props.details.map((d, index) => ({ ...d, key: index }))}
    />
  );
};

export default TaskDetail;
