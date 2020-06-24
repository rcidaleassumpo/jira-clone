import Close from "@material-ui/icons/Close";
import { useState } from "react";
import SearchInput from "../../components/Input/SearchInput";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Drawer,
  Typography,
} from "@material-ui/core";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { getProjects } from "../../db/models/projects";

export async function getServerSideProps() {
  const projects = await getProjects();
  return {
    props: {
      projects,
    }, // will be passed to the page component as props
  };
}

interface ProjectsPageProps {
  projects: Projects[];
}

interface Projects {
  name: string;
  key: string;
  template: string;
  lead: string;
}

export default function Projects({ projects }: ProjectsPageProps) {
  const [drawerState, setDrawerState] = useState(false);

  const handleLeadClick = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleNameClick = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Drawer anchor="left" open={drawerState}>
        <div className="w-screen">
          <Button onClick={() => setDrawerState(false)}>
            <Close></Close>
          </Button>
          <div className="grid grid-cols-3 flex-col items-center">
            <div></div>
            <div>
              <Typography variant="h5">Create Project</Typography>
              <CreateProjectForm></CreateProjectForm>
            </div>
          </div>
        </div>
      </Drawer>
      <div className="m-8">
        <div className="flex justify-between">
          <h1>Projects</h1>
          <Button
            onClick={() => setDrawerState(true)}
            variant="contained"
            size="small"
            color="primary"
            style={{
              textTransform: "none",
              boxShadow: "none",
            }}
            disableRipple
          >
            Create project
          </Button>
        </div>
        <div>
          <div className="flex border border-gray-300 rounded w-56">
            <SearchInput size="small"></SearchInput>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Lead</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((row: any) => {
                return (
                  <TableRow key={row.name}>
                    <TableCell>
                      <Link href="#" onClick={handleNameClick}>
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Link href="#" onClick={handleLeadClick}>
                        {row.lead}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export interface CreateProject {
  projectName: string;
  projectKey: string;
}

const CreateProjectForm = () => {
  const { handleSubmit, register, setError, watch, errors } = useForm<
    CreateProject
  >({
    mode: "onChange",
  });
  const handleFormSubmit = async (formData: CreateProject) => {
    // check if there is any entry with the projectName
    // to get here all fields should be fine
    // Now I should post the form, then if ok the list of projects
    // should be updated.
    try {
      await fetch("/api/projects", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.projectName,
          key: formData.projectKey,
        }),
        method: "POST",
      });
    } catch {
      console.log("Something wrong happened");
    }
  };
  const validateKeyValPair = async (validateObj: {}) => {
    const searchParams = new URLSearchParams(validateObj);
    const response = await fetch(`/api/validate?${searchParams.toString()}`);
    return response.json();
  };
  console.info("errors", errors);
  const projectKey = watch("projectName");

  return (
    <form
      className="mt-4 flex flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
      autoComplete="off"
    >
      <div className="flex flex-col">
        <label htmlFor="projectName" className="text-xs text-gray-600">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          name="projectName"
          className={`w-40 border-2 border-${
            errors.projectName ? "red" : "gray"
          }-400 focus:bg-white focus:border-${
            errors.projectName ? "red" : "blue"
          }-400 focus:outline-none h-8 pl-2 rounded mb-2 hover:bg-gray-300 text-black`}
          title="Please fill out this field"
          type="text"
          ref={register({
            required: true,
            validate: async (val: string) => {
              const { data } = await validateKeyValPair({ name: val });
              return data.validation;
            },
          })}
          placeholder="Enter a project name"
        ></input>
        <div className="text-red-400 text-xs">
          {errors.projectName?.type === "required" && "This field is required"}
          {errors.projectName?.type === "validate" &&
            "A project with that name already exists"}
        </div>
      </div>
      <div>
        <span className="text-xs text-gray-600">Access</span>
        <p className="my-2 text-xs text-gray-500">
          Anyone with access to jira-clone can access and administer this
          project. Upgrade your plan to customize project permissions.
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="projectKey" className="text-xs text-gray-600">
          Key <span className="text-red-400">*</span>
        </label>
        <input
          name="projectKey"
          className={`w-40 border-2 border-${
            errors.projectKey ? "red" : "gray"
          }-400 focus:bg-white focus:border-${
            errors.projectKey ? "red" : "blue"
          }-400 focus:outline-none h-8 pl-2 rounded mb-2 hover:bg-gray-300 text-black`}
          type="text"
          onChange={async (e: any) => {
            const value = e.target.value;
            if (value === projectKey) {
              // sometimes you gotta cheat ;)
              return setError("projectName" as any);
            }
            const { data } = await validateKeyValPair({ key: value });
            if (!data.validation) {
              setError(
                "projectKey",
                "validate",
                `Project '${data.project.name}' uses this project key`
              );
            }
          }}
          ref={register({
            required: "This field is required",
          })}
        ></input>
        <span className="text-xs text-red-400">
          {errors.projectKey && errors.projectKey.message}
        </span>
      </div>

      <div className="flex justify-end mt-10">
        <button
          type="submit"
          className="bg-blue-600 text-white py-1 px-2 rounded"
        >
          Create
        </button>
      </div>
    </form>
  );
};
