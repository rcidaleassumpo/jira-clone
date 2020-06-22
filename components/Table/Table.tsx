import { FunctionComponent } from "react";
import { table } from "console";

interface TableHeader {
  text: string;
  value: string;
}

interface TableComponentProps {
  tableContent: {
    headers: TableHeader[];
    items: any[];
  };
}

export const Table: FunctionComponent<TableComponentProps> = ({
  tableContent,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {tableContent.headers.map((header, ind) => (
            <td key={ind}>{header.text}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableContent.items.map((item, index) => {
          return (
            <tr key={index}>
              {tableContent.headers.map((header, ind) => {
                return <td key={ind}>{item[header.value]}</td>;
              })}
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
