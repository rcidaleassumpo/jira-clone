import DoneIcon from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useState, MouseEvent } from "react";
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
  Menu,
  MenuItem,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Link from "next/link";
import ProjectsService from "../../db/models/projects";
import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import WarningIcon from "@material-ui/icons/Warning";

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

function MoreIconBtn({
  onHandleMoveToTrash,
  onHandleProjectSettings,
}: {
  onHandleMoveToTrash: () => void;
  onHandleProjectSettings: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showModal, setModalshow] = useState(false);

  return (
    <div>
      <button
        onClick={(e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
        className="hover:bg-gray-300 rounded"
      >
        <MoreHorizIcon></MoreHorizIcon>
      </button>
      <Menu
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MenuItem
          onClick={onHandleProjectSettings}
          className="px-2 py-2 hover:bg-gray-100 rounded-0"
        >
          Project settings
        </MenuItem>
        <MenuItem
          onClick={() => (setModalshow(true), setAnchorEl(null))}
          className="px-2 py-2 hover:bg-gray-100"
        >
          Move to trash
        </MenuItem>
      </Menu>
      <Dialog
        aria-labelledby="more-list-delete"
        open={showModal}
        onClose={() => setModalshow(false)}
      >
        <div className="p-4" style={{ maxWidth: 350 }}>
          <header className="flex items-center font-semibold">
            <WarningIcon className="text-red-500 mr-4"></WarningIcon>
            <h1>Move to trash?</h1>
          </header>
          <p className="my-2 text-xs">
            The project along with its issues, components, attachments, and
            versions will be available in the trash for 60 days after which it
            will be permanently deleted. Only Jira admins can restore the
            project from the trash.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setModalshow(false)}
              className="text-gray-400 hover:underline mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => (onHandleMoveToTrash(), setModalshow(false))}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Move
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default function Projects({ projects }: ProjectsPageProps) {
  const [drawerState, setDrawerState] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  // needed to handle removing the project from the list without having to reload the page
  const [internalProjects, setInternalProjects] = useState(projects);
  // actual state that's controlling the projects listed.
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleProjectSettings = () => {
    // handle Project settings page...
  };

  const handleMoveToTrash = async (projectKey: string) => {
    try {
      await fetch(`/api/projects/${projectKey}`, {
        method: "delete",
      });
      setShowSnackbar(true);
      const result = internalProjects.filter(
        (project) => project.key !== projectKey
      );
      setInternalProjects(result);
      setFilteredProjects(result);
    } catch {}
  };

  const handleFilterProjects = (e: any) => {
    const val = e.currentTarget.value.toLowerCase();
    const result = internalProjects.filter(
      (project) =>
        project.key.toLowerCase().includes(val) ||
        project.name.toLowerCase().includes(val)
    );
    setFilteredProjects(result);
  };

  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      >
        <div className="shadow-lg p-2 rounded">
          <DoneIcon
            fontSize="small"
            className="text-white bg-green-400 rounded-full mr-4"
          ></DoneIcon>
          <span className="text-xs mr-4 font-semibold">
            Project successfully moved to trash
          </span>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setShowSnackbar(false)}
          >
            <Close fontSize="small"></Close>
          </IconButton>
        </div>
      </Snackbar>
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
            <SearchInput
              size="small"
              onChange={handleFilterProjects}
            ></SearchInput>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Lead</TableCell>
                <TableCell size="small"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects?.map((row: any) => {
                return (
                  <TableRow key={row.name} className="hover:bg-gray-100">
                    <TableCell>
                      <Link
                        href="/projects/[projectKey]"
                        as={`/projects/${row.key}`}
                      >
                        <a className="text-blue-700 hover:underline">
                          {row.name}
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Link href="#">
                        <a className="text-blue-700 hover:underline">
                          {row.lead}
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell size="small" className="w-5">
                      <MoreIconBtn
                        onHandleMoveToTrash={() => handleMoveToTrash(row.key)}
                        onHandleProjectSettings={handleProjectSettings}
                      ></MoreIconBtn>
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
