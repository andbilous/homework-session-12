const dataToRender = data.slice(0);
let pictureCount = 0;
let renderType = 0;

const lineSelector = document.getElementById("line-selector");
const typeSelector = document.getElementById("type-selector");

lineSelector.value = 1;
typeSelector.value = 1;
renderType = 1;
pictureCount = 1;

lineSelector.addEventListener("change", function() {
  pictureCount = parseInt(lineSelector.value);
});

typeSelector.addEventListener("change", function() {
  renderType = parseInt(typeSelector.value);
});

let btn = document.getElementById("play"),
  firstBlock = document.getElementById("first-line"),
  secondBlock = document.getElementById("second-line"),
  thirdBlock = document.getElementById("third-line");

function fetchData() {
  let resultData = dataToRender.slice(0);
  resultData.forEach(function(item) {
    item.name = item.name.toUpperCase();
    if (item.description.length > 15) {
      item.description = item.description.slice(0, 15) + "...";
    }
    item.date = transformDate(item.date);
    item.url = transformUrl(item.url);
  });
  return resultData;
}
function transformDate(date) {
  return moment(date).format("YYYY/MM/DD");
}
function transformUrl(url) {
  if (url.startsWith('http://')) return url;
  return 'http://' + url;
}
function printResult(data, renderType, count) {
  switch (count) {
    case 0:
      renderingData = data.slice(0);
      break;
    case 1:
      renderingData = data.slice(0, 3);
      break;
    case 2:
      renderingData = data.slice(0, 6);
      break;
  }
  switch (renderType) {
    case 1:
      replaceRender(renderingData);
      break;
    case 2:
      templateRender(renderingData);
      break;
    case 3:
      createElementRender(renderingData);
      break;
    default:
      console.log("error");
  }
}
function replaceRender(renderingData) {
  let itemHTML;
  let resultHTML;

  renderingData.forEach(item => {
    let replaceItemTemplate =
      '<div class="col-sm-3 col-xs-6">\
    <img src="$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';
    itemHTML = replaceItemTemplate
      .replace(/\$name/gi, item.name)
      .replace("$url", transformUrl(item.url))
      .replace("$description", item.description)
      .replace("$date", transformDate(item.date));
    resultHTML += itemHTML;
  });
  firstBlock.innerHTML = resultHTML;
  document.querySelector(".first-group").classList.add("show");
  document.querySelector(".second-group").classList.remove("show");
  document.querySelector(".third-group").classList.remove("show");
}

function createElementRender(renderingData) {
  let temporaryHTML = document.createElement("div");

  renderingData.forEach(item => {
    let itemDiv = document.createElement("div");
    temporaryHTML.appendChild(itemDiv);
    itemDiv.classList.add("col-sm-3", "col-xs-6");
    let itemImage = document.createElement("img");
    itemImage.src = transformUrl(item.url);
    itemImage.alt = item.name;
    itemImage.classList.add("img-thumbnail");

    let infoWrapper = document.createElement("div");

    let itemNameDiv = document.createElement("div");
    itemNameDiv.classList.add("text-muted");
    itemNameDiv.innerText = item.name;
    let itemNameDescription = document.createElement("div");
    itemNameDescription.classList.add("text-muted", "top-padding");
    itemNameDescription.innerText = item.description;
    let itemNameDate = document.createElement("div");
    itemNameDate.classList.add("text-muted");
    itemNameDate.innerText = item.date;
    infoWrapper.appendChild(itemNameDiv);
    infoWrapper.appendChild(itemNameDescription);
    infoWrapper.appendChild(itemNameDate);

    itemDiv.appendChild(itemImage);
    itemDiv.appendChild(infoWrapper);
  });
  thirdBlock.innerHTML = temporaryHTML.innerHTML;
  document.querySelector(".third-group").classList.add("show");
  document.querySelector(".first-group").classList.remove("show");
  document.querySelector(".second-group").classList.remove("show");
}

function templateRender(renderingData) {
  let secondItemTemplate;
  let resultHTML;
  renderingData.forEach(item => {
    item.url = item.url;
    secondItemTemplate = `<div class="col-sm-3 col-xs-6">\
    <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
    <div class="info-wrapper">\
        <div class="text-muted">${item.name}</div>\
        <div class="text-muted top-padding">${item.description}</div>\
        <div class="text-muted">${item.date}</div>\
    </div>\
    </div>`;
    resultHTML += secondItemTemplate;
  });
  secondBlock.innerHTML = resultHTML;
  document.querySelector(".first-group").classList.remove("show");
  document.querySelector(".third-group").classList.remove("show");
  document.querySelector(".second-group").classList.add("show");
}

function run() {
  let preparedData = fetchData();
  printResult(preparedData, renderType, pictureCount);
}

btn.addEventListener("click", run);
