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
  Drawer,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import ProjectsService from "../../db/models/projects";
import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";

export async function getServerSideProps() {
  const projects = await ProjectsService.getProjects();
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
                      <Link
                        href="/projects/[projectKey]"
                        as={`/projects/${row.key}`}
                      >
                        <a>{row.name}</a>
                      </Link>
                    </TableCell>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Link href="#">{row.lead}</Link>
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
