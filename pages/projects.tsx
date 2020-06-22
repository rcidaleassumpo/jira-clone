import SearchInput from "../components/Input/SearchInput";
import SelectInput from "../components/Input/SelectInput";
import { Table } from "../components/Table/Table";

export default function Projects() {
  const tableContent = {
    headers: [
      { text: "Name", value: "name" },
      { text: "Key", value: "key" },
      { text: "Type", value: "type" },
      { text: "Lead", value: "lead" },
    ],
    items: [
      {
        name: "jira-test",
        key: "JT",
        type: "Classic Business",
        lead: "Renan Cidale",
      },
    ],
  };
  const options = [
    { name: "Software", value: "whatever" },
    { name: "Service Desk", value: "whatever" },
    { name: "Business", value: "whatever" },
  ];
  return (
    <>
      <div className="flex justify-between mb-3">
        <h1>Projects</h1>
        <button className="bg-blue-700 rounded p-1 px-3 text-white text-sm">
          Create Project
        </button>
      </div>
      <div className="flex mb-4">
        <SearchInput alignIcon="right"></SearchInput>
        <SelectInput options={options}></SelectInput>
      </div>
      <Table tableContent={tableContent}></Table>
    </>
  );
}
