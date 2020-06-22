import "../styles/index.css";
import Nav from "../components/Nav";
import MenuIcon from "../components/Icons/MenuIcon";
import SearchInput from "../components/Input/SearchInput";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const handleChange = (val: string) => {
    console.info(val);
  };
  return (
    <>
      <Nav>
        <div className="flex">
          <MenuIcon></MenuIcon>
          <h1 className="ml-2">Jira Clone</h1>
        </div>
        <div>
          <SearchInput onChange={handleChange}></SearchInput>
        </div>
      </Nav>
      <div className="p-8 pt-2">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
