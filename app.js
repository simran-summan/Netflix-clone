const apiKey = "api_key=541b72701cac030de784a96083163114";

const base_url = "https://api.themoviedb.org/3";

const img_url = "https://image.tmdb.org/t/p/w500";
const banner_url = "https://image.tmdb.org/t/p/original";

const request = {
  fetchTrending: `${base_url}/trending/all/week?${apiKey}&language=en-US`,
  fetchNetflixOriginal: `${base_url}/discover/tv?${apiKey}&with_networks=213`,
  fetchComedyMovies: `${base_url}/discover/tv?${apiKey}&with_genres=35`,
  fetchDocumentaryMovies: `${base_url}/discover/tv?${apiKey}&with_genres=99`,
  fetchRomanceMovies: `${base_url}/discover/tv?${apiKey}&with_genres=10749`,
  fetchFamilyMovies: `${base_url}/discover/tv?${apiKey}&with_genres=10751`,
};

fetch(request.fetchNetflixOriginal)
  .then((data) => data.json())
  .then((data) => {
    // console.log(data);
    let setMovie =
      data?.results[Math.floor(Math.random() * data.results.length)];
    let bannerImg = document.querySelector(".banner-img");
    let bannerTitle = document.querySelector(".banner-title");
    bannerTitle.style.fontSize = "3rem";
    let bannerDisc = document.querySelector(".banner-disc");

    // bannerImg.style.backgroundImage = url(banner_url+data.backdrop_path)
    bannerImg.style.backgroundImage =
      "url(" + banner_url + setMovie.backdrop_path + ")";
    bannerTitle.innerHTML = setMovie.name || setMovie.title;
    bannerDisc.innerHTML = setMovie.overview;
  });

const fetchCallingFunction = async (url, title) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    let row = document.querySelector("#row");
    let comdeyRow = document.createElement("div");
    let heading = document.createElement("h2");
    heading.innerText = title;
    heading.className = "row-title";
    comdeyRow.className = "posters-row";
    row.appendChild(heading);

    // console.log(row);

    data?.results?.forEach((ele) => {
      let posters = document.createElement("div");
      posters.className = "image-container";
      let image = document.createElement("img");
      image.className = "image";
      image.src = banner_url + ele.backdrop_path;
      posters.appendChild(image);
      // posters.classList.add('poster')
      // console.log(ele);
      let detailsContainer = document.createElement("div");
      detailsContainer.className = "details-container";

      // Additional details
      let title = document.createElement("h3");
      title.textContent = ele.title || ele.name;
      let overview = document.createElement("p");
      overview.textContent = ele.overview;
      detailsContainer.appendChild(title);
      // detailsContainer.appendChild(overview);

      // Button
      let button = document.createElement("button");
      button.textContent = "Play";
      posters.appendChild(detailsContainer);
      detailsContainer.appendChild(button);

      
      console.log(comdeyRow);
      comdeyRow.appendChild(posters);
      
    });
    
    row.appendChild(comdeyRow);
  } catch (error) {
    console.log("an error haas occured:", error);
  }
};

const fetchNetflixOriginal = async () => {
  fetchCallingFunction(request.fetchNetflixOriginal, "Netflix Originals");
};
const fetchTrending = async () => {
  fetchCallingFunction(request.fetchTrending, "Trending");
};
const fetchComedyMovies = async () => {
  fetchCallingFunction(request.fetchComedyMovies, "Comdey");
};
const fetchRomanceMovies = async () => {
  fetchCallingFunction(request.fetchRomanceMovies, "Romance");
};
const fetchFamilyMovies = async () => {
  fetchCallingFunction(request.fetchFamilyMovies, "Family Shows");
};
const fetchDocumentaryMovies = async () => {
  fetchCallingFunction(request.fetchDocumentaryMovies, "Documentary");
};

fetchNetflixOriginal();
fetchTrending();
fetchRomanceMovies();
fetchComedyMovies();
fetchFamilyMovies();
fetchDocumentaryMovies();
