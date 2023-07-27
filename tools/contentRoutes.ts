import fs from "fs";

export const GenerateRoutes = (routes: string[]) => {
  let contents: string[] = [];
  for (const i in routes) {
    contents = contents.concat(Generating(routes[i]));
  }
  return contents;
};

const Generating = (path: string, files_: string[] = []) => {
  files_ = files_ || [];
  const route = "content/" + path;
  const files = fs.readdirSync(route);
  for (const i in files) {
    const name = route + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      Generating(name, files_);
    } else {
      files_.push(name.replace("content", "").replace(".md", ""));
    }
  }
  return files_;
};
