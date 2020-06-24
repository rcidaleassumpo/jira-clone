import Close from "@material-ui/icons/Close";
import { useState, ChangeEvent } from "react";
import SearchInput from "../components/Input/SearchInput";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Drawer,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { SyntheticEvent } from "react";
import Datastore from "nedb";

const db = {
  projects: new Datastore({
    autoload: true,
    filename: "projects.db",
  }),
};

function getProjects() {
  return new Promise((res, rej) => {
    db.projects.find({}, (err: any, docs: any) => {
      if (err) {
        rej(err);
      } else {
        res(docs);
      }
    });
  });
}

export async function getServerSideProps() {
  const projects = await getProjects();
  return {
    props: {
      tableContent: projects,
    }, // will be passed to the page component as props
  };
}

export default function Projects(props: any) {
  const [drawerState, setDrawerState] = useState(false);
  const [template, setTemplate] = useState("");

  const handleLeadClick = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleNameClick = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleSelectedTemplate = (e: ChangeEvent<HTMLSelectElement>) => {
    setTemplate(e.target.value);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.info(e);
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
              <form
                className="mt-4 flex flex-col gap-10"
                onSubmit={handleFormSubmit}
              >
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  placeholder="Enter a project name"
                />
                <TextField required label="Key" variant="outlined" />
                <FormControl>
                  <InputLabel id="project-select">Template</InputLabel>
                  <Select
                    value={template}
                    onChange={(e) => handleSelectedTemplate(e)}
                  >
                    <MenuItem value="scrum">Scrum</MenuItem>
                    <MenuItem value="kanban">Kanban</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  className="w-24"
                >
                  Create
                </Button>
              </form>
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
              {props.tableContent?.map((row: any) => {
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
