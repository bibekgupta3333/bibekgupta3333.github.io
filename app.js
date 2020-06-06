// getData fetch function
async function getData(url) {
  const Response = await fetch(`${url}`);

  const ResponseData = await Response.json();

  return ResponseData;
}

// calling  getData for profile information start
getData(" https://api.github.com/users/bibekgupta3333").then((users) => {
  const output = `
  <img class='img-fluid rounded w-50 mt-3 text-center mb-4' src="${users.avatar_url}"  />
  <div class="text-left">
  <h3><i class="fas fa-fighter-jet text-dark"></i> Name: ${users.name}</h3>
  <h3><i class="fas fa-fighter-jet text-dark"></i> Profession: <h4>${users.bio}</h4> </h3>
  <h3><i class="fas fa-fighter-jet text-dark"></i> Github: <a href="${users.html_url}" target="_blank" class='text-dark text-decoration-none'>Bibek Gupta </a></h3>
  <h3><i class="fas fa-fighter-jet text-dark"></i> Repo: ${users.public_repos}</h3>
  <h3 class="mb-4" ><i class="fas fa-fighter-jet text-dark"></i> Followers: ${users.followers}</h3>
  </div>

`;
  document.querySelector(".profile").innerHTML = output;

  // fetch repo function inside the promise of getData for getting call repository d
  async function getRepo(url) {
    const Response = await fetch(`${url}`);
    const ResponseData = await Response.json();
    return ResponseData;
  }

  let repoPageCount = Math.ceil(users.public_repos / 2),
    pageCount = 1,
    lastPageCount = Math.ceil((repoPageCount * 2) / 3);

  // attaching event to next and prev button for navigation between the page asynchronously
  document.getElementById("next").addEventListener("click", loadNext);
  document.getElementById("prev").addEventListener("click", loadPrev);

  // for initial first page content start
  getRepo(
    ` https://api.github.com/users/bibekgupta3333/repos?page=${pageCount}&per_page=3`
  ).then((datas) => {
    let repoContent = "";
    // iterating through initial content and displaying window
    datas.forEach((data) => {
      repoContent += `
         <div class="box rounded shadow text-white text-center p-2 slide" >
         <a href="${
           data.svn_url
         }" target="_blank" class='text-uppercase text-decoration-none text-dark'> <h4>${
        data.name
      }</h4></a>
      <h5 class='lead'>${data.description}</h5>
      <h6 class='text-left pr-5'>Created: ${data.pushed_at.slice(0, 10)}</h6>
      </div>
      `;
    });
    document.getElementById("repoContent").innerHTML = repoContent;
    document.getElementById("currentPage").innerHTML = `${pageCount}`;
  });
  // for initial first page content end
  // display none if initially in first page
  if (pageCount === 1) {
    document.getElementById("prev").style.visibility = "hidden";
  }

  // event of next button start
  function loadNext() {
    pageCount += 1;
    if (pageCount === lastPageCount) {
      pageCount = lastPageCount;
      document.getElementById("next").style.visibility = "hidden";
    } else {
      document.getElementById("next").style.visibility = "visible";
    }
    getRepo(
      `  https://api.github.com/users/bibekgupta3333/repos?page=${pageCount}&per_page=3`
    ).then((datas) => {
      let repoContent = "";
      // iterating through content and displaying window
      datas.forEach((data) => {
        repoContent += `
               <div class="box rounded shadow text-white text-center p-2 slide" >
               <a href="${
                 data.svn_url
               }" target="_blank" class='text-uppercase text-decoration-none text-dark'> <h4>${
          data.name
        }</h4></a>
           <h5 class='lead'>${data.description}</h5>
           <h6 class='text-left'>Created: ${data.pushed_at.slice(0, 10)}</h6>
            </div>
            `;
      });
      document.getElementById("repoContent").innerHTML = repoContent;
      document.getElementById("currentPage").innerHTML = `${pageCount}`;
      document.getElementById("prev").style.visibility = "visible";
    });
  }
  // event of next button end
  // event of prev button Start
  function loadPrev() {
    pageCount -= 1;
    if (pageCount === 1) {
      document.getElementById("prev").style.visibility = "hidden";
      document.getElementById("next").style.visibility = "visible";
    } else {
      document.getElementById("prev").style.visibility = "visible";
    }
    getRepo(
      `  https://api.github.com/users/bibekgupta3333/repos?page=${pageCount}&per_page=3`
    ).then((datas) => {
      let repoContent = "";
      // iterating through initial content and displaying window
      datas.forEach((data) => {
        repoContent += `
        <div class="box rounded shadow text-white text-center p-2 slide" >
        <a href="${
          data.svn_url
        }" target="_blank" class='text-uppercase text-decoration-none text-dark'> <h4>${
          data.name
        }</h4></a>
     <h5 class='lead'>${data.description}</h5>
     <h6 class='text-left'>Created: ${data.pushed_at.slice(0, 10)}</h6>
     </div>
            `;
      });
      document.getElementById("repoContent").innerHTML = repoContent;
      document.getElementById("currentPage").innerHTML = `${pageCount}`;
      document.getElementById("next").style.visibility = "visible";
    });
  }
  // event of prev button End
});
