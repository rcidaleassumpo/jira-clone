import { GetServerSidePropsContext } from "next";
import Router from "next/router";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (ctx.res) {
    ctx.res.writeHead(302, {
      Location: "/projects",
      "Content-Type": "text/html;charset=utf-8",
    });
    ctx.res.end();
    return;
  }
  Router.replace("/projects");
}

export default function Home() {}
