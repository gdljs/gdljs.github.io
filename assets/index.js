const App = async () => {
  const branch = "feature.add-more-context";
  const picUrlTemplate = `https://raw.githubusercontent.com/gdljs/gdljs.github.io/${branch}/`;
  const picsUrl = `https://api.github.com/repos/gdljs/gdljs.github.io/git/trees/${branch}?recursive=1`;

  let pics;
  const response = await fetch(picsUrl);
  if (response.ok) {
    const repoContent = await response.json();
    pics = repoContent.tree
      .filter((item) => item.path.indexOf("assets/pics/") === 0)
      .map((pic) => {
        return picUrlTemplate + pic.path;
      });
  } else {
    alert("HTTP-Error: " + response.status);
  }

  console.log(pics);
};

App();
