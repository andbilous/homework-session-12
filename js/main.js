const dataToRender = data.splice("");
let pictureCount;
let renderType;

const lineSelector = document.getElementById("line-selector");
const typeSelector = document.getElementById("type-selector");
let itemList = document.createElement("ul");

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
  firstBlock = document.querySelector("#first-line"),
  secondBlock = document.querySelector("#second-line"),
  thirdBlock = document.querySelector("#third-line");

function resetView() {
  document.querySelector(".first-group").classList.add("hide");
  document.querySelector(".second-group").classList.add("hide");
  document.querySelector(".third-group").classList.add("hide");
}

function fetchData() {
  let resultData = dataToRender.splice("");
  resultData.forEach(function(item) {
    item.name = item.name.toUpperCase();
    if (item.description.length > 15) {
      item.description = item.description.slice(0, 15) + "...";
    }
  });
  return resultData;
}
function printResult(data, renderType, count) {
  renderingData = data.slice(0, count - 1);
  renderingData.forEach(function(item) {
    switch (renderType) {
      case 1:
        replaceRender(item);
        break;
      case 2:
        templateRender(item);
        break;
      case 3:
        createElementRender(item);
        break;
      default:
        console.log("error");
    }
  });
}
function replaceRender(item) {
  let replaceItemTemplate =
    '<div class="col-sm-3 col-xs-6">\
    <img src="$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';

  let resultHTML = replaceItemTemplate
    .replace(/\$name/gi, item.name)
    .replace("$url", item.url)
    .replace("$description", item.description)
    .replace("$date", item.date);
  firstBlock.innerHTML = resultHTML;
  document.querySelector(".first-group").classList.add("show");
}
function createElementRender(item) {
  let itemElem = document.createElement("li");
  itemElem.innerHTML = item;
  thirdBlock.innerHTML = itemList.appendChild(itemElem);
  document.querySelector(".third-group").classList.add("show");
}
function templateRender(item) {
  let secondItemTemplate = `<div class="col-sm-3 col-xs-6">\
        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
        <div class="info-wrapper">\
            <div class="text-muted">${item.name}</div>\
            <div class="text-muted top-padding">${item.description}</div>\
            <div class="text-muted">${item.date}</div>\
        </div>\
        </div>`;
  secondBlock.innerHTML = secondItemTemplate;
  document.querySelector(".second-group").classList.add("show");
}

function run() {
  resetView();
  let preparedData = fetchData();
  print(preparedData, renderType, pictureCount);
}

btn.addEventListener("click", run());
