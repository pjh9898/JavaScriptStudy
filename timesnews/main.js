let news = [];
let page = 1;
let total_pages = 0;

let url = new URL(
  "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10"
);
let topic = document.querySelectorAll("#menu-list button");
let search = document.querySelector(".search-button");

topic.forEach((menu) => menu.addEventListener("click", (e) => getTopicNews(e)));
search.addEventListener("click", getKeywordNews);

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "Mr_bcODmhEt-ABf35DS29X4-uSedalApesw6KT4rgYs",
    });

    url.searchParams.set("page", page);
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    console.log("data=", data);
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error(data.status);
      }
      news = data.articles;
      page = data.page;
      total_pages = data.total_pages;
      console.log(news);
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = () => {
  page = 1;
  url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10"
  );
  getNews();
};

const getTopicNews = (event) => {
  page = 1;
  topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
};

function getKeywordNews() {
  page = 1;
  keyword = document.querySelector(".search-input").value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=10`
  );
  getNews();
}

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `
        <div class="row news">
            <div class="col-lg-4">
                <img
                    class="news-img"
                    src="${item.media ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                    }"/>
            </div>
            <div class="col-lg-8">
                <a class="title" href="${item.link}">${item.title}</a>
                <p>${item.summary == null || item.summary == ""
                        ? "내용없음"
                        :item.summary.length > 200
                        ?item.summary.substring(0, 200) + "..."
                        :item.summary
                    }</p>
                <div>${item.rights || "no source"} ${item.published_date}</div>
            </div>
        </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
  pagenation();
};

const errorRender = (message) => {
  document.getElementById(
    "news-board"
  ).innerHTML = `<h3 class="alert alert-danger text-center" role="alert">${message}</h3>`;
};

const pagenation = () => {
  let pagenationHTML = "";
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  if (last > total_pages){
      last = total_pages;
  }
  let first = (last - 4) < 0 ? 1 : (last - 4);

  if (page > 5) {
    pagenationHTML += `
    <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(1)"}>
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
    <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(page-5)">
            <span aria-hidden="true">&lt;</span>
        </a>
    </li>`;
  }

  for (let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
  }
  
  if (page <= total_pages - 5) {
    pagenationHTML += `
    <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(page+5)">
            <span aria-hidden="true">&gt;</span>
        </a>
    </li>
    <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(total_pages)">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`;
  }
  document.querySelector(".pagination").innerHTML = pagenationHTML;
}

const moveToPage = (pageNum) => {
  page = pageNum;
  getNews();
}

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display == "inline"){
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
}

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}

getLatestNews();
