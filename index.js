"use strict"; // بتعرف الحاجه فيها error وله لا 

// get totle (done)
// create product (done)
// save local storage (done)
// clear inputs (done)
// read (done)
// count (done)
// delete (done)
// update (done)
// search
// clean data

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const taxes = document.querySelector("#taxes");
const ads = document.querySelector("#ads");
const discount = document.querySelector("#discount");
const total = document.querySelector("#total");
const count = document.querySelector("#count");
const category = document.querySelector("#category");
const submit = document.querySelector("#btn");

let mood = "create"
let tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)

// 1-get total
function getTotal() {
    // console.log("done")

     if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green";
     }
     else{
        total.innerHTML = '';
        total.style.background = "#003f88";
     }
}

// 2-create product
let dataproject;
if (localStorage.product != null) {
    dataproject = JSON.parse(localStorage.product);
}

else{
    dataproject = [];
};

submit.onclick = function() {
    let newproject = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != '' && price.value != '' && category.value != '' && newproject.count < 101){
        
        if(mood === 'create'){
            if(newproject.count > 1){
                for(let i = 0; i < newproject.count; i++){
                    dataproject.push(newproject);
                }
            }
            else{
                dataproject.push(newproject);
            }
        }
        else{
         dataproject[tmp] = newproject;
         mood = 'create';
         submit.innerHTML = 'Create';
         count.style.display = 'block';
        }
        dataclear()

    }


    // 3-save local storage
    localStorage.setItem('product', JSON.stringify(dataproject));
    // console.log(dataproject);
    // dataclear()
    datashow()
}

// 4-clear inputs
function dataclear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = '';
}

// 5-read
function datashow() {
    getTotal()
    let table = '';
    for(let i = 0; i < dataproject.length; i++){
        table += 
        `
    <tr>
        <td>${i+1}</td>
        <td>${dataproject[i].title}</td>
        <td>${dataproject[i].price}</td>
        <td>${dataproject[i].taxes}</td>
        <td>${dataproject[i].ads}</td>
        <td>${dataproject[i].discount}</td>
        <td>${dataproject[i].total}</td>
        <td>${dataproject[i].category}</td>
        <td><button onclick = "dataupdate(${i})" id="update">update</button></td>
        <td><button onclick = "datadelete(${i})" id="delete">delete</button></td>
    </tr>
    `
    }
    document.querySelector("#tbody").innerHTML = table;
    let btndelete = document.querySelector("#deleteall");
    if(dataproject.length > 0){
        btndelete.innerHTML = `
        <button onclick = "deleteall()">Delete All(${dataproject.length})</button>
        `
    }
    else{
        btndelete.innerHTML = '';
    }
}
datashow()

// 6-delete
function datadelete(i) {
    dataproject.splice(i,1);
    localStorage.product = JSON.stringify(dataproject);
    datashow()
}

// 7-deleteall
function deleteall() {
    localStorage.clear();
    dataproject.splice(0);
    datashow();
}

// 8-count

// 9-update
function dataupdate(i) {
  // console.log(i);
  title.value = dataproject[i].title; 
  price.value = dataproject[i].price; 
  taxes.value = dataproject[i].taxes; 
  ads.value = dataproject[i].ads; 
  discount.value = dataproject[i].discount; 
  getTotal()
  count.style.display = "none";
  category.value = dataproject[i].category;
  submit.innerHTML = "Update";
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior: 'smooth',
  })
}

// 10-search
let searchMood = "title";
function getSearchMood(id) {
    let search = document.querySelector("#search");
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }

    else{
        searchMood = 'Category';
        search.placeholder = 'Search By Category';
    }
    // search.placeholder = 'Search By '+ searchMood;

    search.focus()
    search.value = '';
    datashow();
}

function datasearch(value) {
    let table = '';
    if(searchMood == 'title'){
       for(let i = 0; i < dataproject.length; i++){
        if(dataproject[i].title.includes(value.toLowerCase())){
            table += 
            `
        <tr>
            <td>${i}</td>
            <td>${dataproject[i].title}</td>
            <td>${dataproject[i].price}</td>
            <td>${dataproject[i].taxes}</td>
            <td>${dataproject[i].ads}</td>
            <td>${dataproject[i].discount}</td>
            <td>${dataproject[i].total}</td>
            <td>${dataproject[i].category}</td>
            <td><button onclick = "dataupdate(${i})" id="update">update</button></td>
            <td><button onclick = "datadelete(${i})" id="delete">delete</button></td>
        </tr>
        `
        }
       }       
    }

    else{
        for(let i = 0; i < dataproject.length; i++){
            if(dataproject[i].category.includes(value.toLowerCase())){
                table += 
                `
            <tr>
                <td>${i}</td>
                <td>${dataproject[i].title}</td>
                <td>${dataproject[i].price}</td>
                <td>${dataproject[i].taxes}</td>
                <td>${dataproject[i].ads}</td>
                <td>${dataproject[i].discount}</td>
                <td>${dataproject[i].total}</td>
                <td>${dataproject[i].category}</td>
                <td><button onclick = "dataupdate(${i})" id="update">update</button></td>
                <td><button onclick = "datadelete(${i})" id="delete">delete</button></td>
            </tr>
            `
            }
           }   
    }
    document.querySelector("#tbody").innerHTML = table;
}  

// 11-clean data
