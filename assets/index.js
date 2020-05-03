const App = async () => {
  const branch = "feature.add-more-context";
  const repoUrlTemplate = `https://raw.githubusercontent.com/gdljs/gdljs.github.io/${branch}/`;

  const contentDoc = "content.html";
  const request = await fetch(repoUrlTemplate + contentDoc, { method: "get" });
  const requestReader = await request.body.getReader();
  const content = await requestReader.read();
  console.log(">>>>>>>", content.value.toString());

  const picsUrl = `https://api.github.com/repos/gdljs/gdljs.github.io/git/trees/${branch}?recursive=1`;
  let pics;
  const response = await fetch(picsUrl);
  if (response.ok) {
    const repoContent = await response.json();
    pics = repoContent.tree
      .filter((item) => item.path.indexOf("assets/pics/") === 0)
      .map((pic) => {
        return repoUrlTemplate + pic.path;
      });
  } else {
    alert("HTTP-Error: " + response.status);
  }

  // console.log(pics);
};

window.addEventListener("DOMContentLoaded", (event) => {
  App();
});
