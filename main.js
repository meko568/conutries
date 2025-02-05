let req = new XMLHttpRequest();
req.open("get", "main.json");
req.send()
console.log(req);
let obj = { a: "b" };
delete obj["a"];
let list = document.querySelector("datalist");
let search = document.querySelector("[list]");
let valid = false;
let main = "";
let data = ""
async function dataa() {
  try {
    let obj = (await fetch("main.json"));
    data = await obj.json()
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === "Israel") {
      } else {
        let div = document.createElement("div");
        div.className = `country ${data[i].name}`
        div.setAttribute("data-num", i)
        div.innerHTML = `<img src="${data[i].flag}"><div class="info"><h2 class="name">${data[i].name}</h2><p class="pop">population:${data[i].population}</p><p class="region">region:<span>${data[i].region}</span></p><p class="capital">capital:${data[i].capital}<p></div>`;
        document.querySelector(".countries").appendChild(div);
        let opt = document.createElement("option");
        opt.setAttribute("value", data[i].name)
        list.appendChild(opt)
      }
    }
    re()
  } catch (e) {

  }
}
dataa();
document.querySelector(".dark").onclick = function () {
  document.querySelector(".main").classList.toggle("very")
  document.querySelector(".dark").parentElement.classList.toggle("verys");
  valid = !valid;
  localStorage.valid1 = valid
}
if (localStorage.valid1) {
  if (localStorage.valid1 === true) {
    document.querySelector(".main").classList.remove("very")
    document.querySelector(".dark").parentElement.classList.remove("verys");
  } else {
    document.querySelector(".main").classList.add("very")
    document.querySelector(".dark").parentElement.classList.add("verys");
  }
}
function re() {
  let list = document.querySelector("datalist");
  let search = document.querySelector("[list]");
  search.oninput = function () {
    document.querySelectorAll(".country .name").forEach(function (e) {
      if (e.innerHTML.includes(search.value)) {
        e.parentElement.parentElement.style.display = "block"

      } else {
        e.parentElement.parentElement.style.display = "none"
      }
    })
  }
  document.querySelectorAll(".select div").forEach(function (e) {
    e.onclick = function () {
      document.querySelectorAll(".country .region").forEach(function (n) {
        if (e.innerHTML === n.children[0].innerHTML) {
          n.parentElement.parentElement.style.display = "block"
        } else {
          n.parentElement.parentElement.style.display = "none"
        }
      })
    }
  })
  document.querySelector(".regions").onclick = function () {
    document.querySelector(".select").classList.toggle("display")
  };
  main = document.querySelector(".main").innerHTML;
  document.querySelectorAll(".country").forEach(function (e) {
    e.onclick = function () {
      document.querySelector(".main").innerHTML = `
  <div class="back"><i class="fa-solid fa-arrow-left anl"></i></i>back</div><img src="${e.children[0].src}" alt="image">
  <div class="info">
      <h1>${e.children[1].children[0].innerHTML}</h1>
      <div>
      <p>native name:  ${data[+e.dataset.num].nativeName}</p>
      <p>population:  ${data[+e.dataset.num].population}</p>
      <p>region:  ${data[+e.dataset.num].region}</p>
      <p>sub region:  ${data[+e.dataset.num].subregion}</p>
      <p>capital:  ${data[+e.dataset.num].capital}</p>
      </div>
      <div>
      <p>top level domai:  ${data[+e.dataset.num].topLevelDomain[0]}</p>
      <p>currencies:  ${data[+e.dataset.num].currencies[0].name}</p>
      <p>languages:</p>
      </div>
      <div>
      <p>border countries:</p>
      </div>
  </div>`;
      document.querySelector(".main").classList.add("one")
      for (let i = 0; i < data[+e.dataset.num].languages.length; i++) {
        let div1 = document.createElement("div");
        div1.innerHTML = data[+e.dataset.num].languages[i].name + " ";
        document.querySelector(".main .info div:nth-child(3) p:nth-child(3)").appendChild(div1)
      }
      if (data[+e.dataset.num].borders) {
        for (let i = 0; i < data[+e.dataset.num].borders.length; i++) {
          let div1 = document.createElement("div");
          div1.innerHTML = data[+e.dataset.num].borders[i];
          document.querySelector(".main .info div:nth-child(4) p").appendChild(div1)
        }
      } else {
        let div1 = document.createElement("div");
        div1.innerHTML = `none;`
        document.querySelector(".main .info div:nth-child(4) p").appendChild(div1)
      }
      document.querySelector(".back").onclick = function () {
        document.querySelector(".main").innerHTML = main;
        document.querySelector(".main").classList.remove("one")
        re()
      }
    }
  })
}