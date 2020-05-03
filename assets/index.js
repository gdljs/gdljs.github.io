const App = async () => {
  const branch = "feature.add-more-context";
  const repoUrlTemplate = `//raw.githubusercontent.com/gdljs/gdljs.github.io/${branch}/`;

  const contentEl = document.querySelector(".main-layout-content");
  const contentDoc = "content.html";
  // const request = await fetch(repoUrlTemplate + contentDoc, { method: "get" });
  const request = await fetch("./" + contentDoc, { method: "get" });
  const content = await request.text();
  contentEl.innerHTML = content;

  const slideshowEl = document.querySelector(".slideshow");
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
  const setRandomBackgroundImage = () => {
    slideshowEl.style.backgroundImage = `url(${
      pics[Math.floor(Math.random() * pics.length)]
    })`;
  };
  slideshowEl.addEventListener("animationiteration", setRandomBackgroundImage);
  setRandomBackgroundImage();
};

window.addEventListener("DOMContentLoaded", (event) => {
  App();
});
