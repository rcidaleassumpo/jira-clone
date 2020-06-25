import ProjectsService, { Project } from "../../db/models/projects";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Error from "next/error";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the project with id context.query.projectKey
  // need to know how to "crash" if projectKey is not found
  const projectKey = context.query.projectKey;
  const project = await ProjectsService.getProject({ key: projectKey });
  return {
    props: {
      project,
    },
  };
};
export default function Example({ project }: { project?: Project }) {
  // First step. markup
  const [create, setCreate] = useState(false);
  const [createContent, setCreateContent] = useState("");
  const handleSaveIssueCreation = () => {
    console.info("process saving of content..", createContent);
  };

  return project == null ? (
    <Error statusCode={404} />
  ) : (
    <div className="p-6">
      <Breadcrumbs>
        <Link href="/projects">
          <a className="text-gray-500 text-sm">Projects</a>
        </Link>
        <Link href="/projects/[projectKey]" as={`/projects/${project.key}`}>
          <a className="text-gray-500 text-sm">{project.name}</a>
        </Link>
      </Breadcrumbs>
      <Typography variant="h6">Board</Typography>
      <div className="flex h-8 my-5">
        <input
          type="text"
          className={`w-40 border-2 border-gray focus:bg-white 
                      focus:border-blue-400 focus:outline-none 
                       h-full pl-2 rounded mb-2 hover:bg-gray-300 text-black mr-2`}
        ></input>
        <button className="mr-2 bg-gray-100 text-gray-600 rounded px-2 py-1">
          Assigned to me
        </button>
        <button className="mr-2 bg-gray-100 text-gray-600 rounded px-2 py-1">
          Due this week
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        <div className="px-1 bg-gray-100 pt-4 pb-1 rounded">
          <div className="ml-2 mb-2 text-gray-500">TO DO 6</div>
          <div
            tabIndex={0}
            className="bg-white outline-none py-2 px-2 rounded border 
                        border-gray-200 focus:border focus:border-blue-400 
                         cursor-pointer"
          >
            <div>Header stuff...</div>
            <div className="text-right text-gray-400">{project.key}</div>
          </div>
          <div className="mt-1">
            {create ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setCreateContent(e.target.value)}
                  autoFocus
                  className="pb-6 pt-1 px-2 w-full outline-none border-gray-200 border rounded mt-1 focus:border-blue-400"
                  placeholder="Start typing..."
                ></input>
                <div className="flex mt-2">
                  <button
                    className={`text-sm rounded px-2 py-1 mr-4 ${
                      createContent ? "text-white bg-blue-700" : "text-gray-600"
                    }`}
                    onClick={handleSaveIssueCreation}
                    disabled={!createContent}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-800 text-sm rounded px-2 py-1 hover:bg-gray-200"
                    onClick={() => setCreate(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <button
                className="hover:bg-gray-200 w-full outline-none p-2 flex"
                onClick={() => {
                  setCreate(true);
                }}
              >
                <AddIcon fontSize="small"></AddIcon>
                Create
              </button>
            )}
          </div>
        </div>
        <div>
          <div>TO DO 6</div>
          <div>
            <div>Header stuff...</div>
            <div>footer stuff...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
