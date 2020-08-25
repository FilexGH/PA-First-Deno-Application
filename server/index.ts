import {
  serve,
  ServerRequest,
} from "https://deno.land/std@0.66.0/http/server.ts";
import { get_all_posts, insert_new_post } from "./db.ts";

const HEADERS = new Headers([["Access-Control-Allow-Origin", "*"]]);
const PORT: number = 3000;
const server = serve({ port: PORT });
console.log(`Listening on port ${PORT}`);

const return_data = (req: ServerRequest): void => {
  get_all_posts().then((all_posts) =>
    req.respond({ headers: HEADERS, body: all_posts })
  );
};

const post_data = async (req: ServerRequest) => {
  let decoder: TextDecoder = new TextDecoder("utf-8");
  let Uint8ArrayData: Uint8Array = await Deno.readAll(req.body);
  let body: object = JSON.parse(decoder.decode(Uint8ArrayData));
  if (Object.keys(body).join(" ") === "author message date") {
    insert_new_post(body);
    req.respond({ headers: HEADERS, body: "POSTED" });
  } else {
    req.respond({ headers: HEADERS, body: "WRONG FORMAT" });
  }
};

const handle_get_request = (req: ServerRequest): void => {
  if (req.url === "/") {
    return_data(req);
  } else {
    req.respond({ headers: HEADERS, body: `ERROR: PATH DOESN'T EXIST.` });
  }
};

const handle_post_request = (req: ServerRequest): void => {
  if (req.url === "/") {
    post_data(req);
  } else {
    req.respond({ headers: HEADERS, body: `ERROR: PATH DOESN'T EXIST.` });
  }
};

for await (const req of server) {
  if (req.method === "GET") {
    handle_get_request(req);
  } else if (req.method === "POST") {
    handle_post_request(req);
  }
}
