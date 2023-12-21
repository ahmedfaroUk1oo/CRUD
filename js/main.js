var prodName = document.getElementById("pname");
var prodPrice = document.getElementById("pprice");
var prodCategory = document.getElementById("pcategory");
var prodDesc = document.getElementById("pdesc");

var productList = [];
var localStorageKey = "allProducts";

function addToLocalStorage() {
    localStorage.setItem(localStorageKey,JSON.stringify(productList));
}


if(JSON.parse(localStorage.getItem(localStorageKey))) {
    productList= JSON.parse(localStorage.getItem(localStorageKey));
    displayProduct(productList);
}

function addProduct() {

    if(validateProduct(/^[A-Z][a-z]{3,6}$/,prodName.value,"nameError") 
            && validateProduct(/^([1-9][0-9][0-9][0-9]|10000)$/,prodPrice.value,"priceError")
            && validateProduct(/^([mM]obile|[sS]creen|[Ww]atch)$/,prodCategory.value,"cateError") 
            && validateProduct(/^([a-zA-Z\s]{10,250})$/,prodDesc.value,"descError")) {
        var product = {
            name : prodName.value ,
            price : prodPrice.value ,
            category : prodCategory.value ,
            description : prodDesc.value
        };
    
        productList.push(product);
        addToLocalStorage()
    
        displayProduct(productList);
        clearProduct();
    }

}



function displayProduct (list) {
    var blackbox = "";
    for(var i=0; i<list.length; i++) {
        blackbox += `
        <tr>
        <td>${i+1}</td>
        <td>${list[i].newName ? list[i].newName : list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td class="text-wrap">${list[i].description}</td>
        <td>
            <button class="btn btn-success" onclick="editBtn(${i})">Edit</button>
        </td>
        <td>
            <button class=" btn btn-danger " onclick="deleteProduct(${i})" >Delete</button>
        </td>
    </tr>`

    }
document.getElementById("products").innerHTML = blackbox;
}



function clearProduct(editValue) {
    prodName.value = editValue? editValue.name:"";
    prodPrice.value=editValue? editValue.price:"";
    prodCategory.value=editValue?editValue.category:"";
    prodDesc.value=editValue? editValue.description:"";
}

function deleteProduct(index){
    productList.splice(index,1);
    addToLocalStorage()
    displayProduct(productList);

}

var productUpdateVAlue = 0;
function editBtn(index) {
    clearProduct(productList[index]);
    document.getElementById("add").classList.add("d-none");
    document.getElementById("update").classList.remove("d-none");
    productUpdateVAlue = index;
}

function updateProduct() {
    if(validateProduct(/^[A-Z][a-z]{3,6}$/,prodName.value,"nameError") 
    && validateProduct(/^([1-9][0-9][0-9][0-9]|10000)$/,prodPrice.value,"priceError")
    && validateProduct(/^([mM]obile|[sS]creen|[Ww]atch)$/,prodCategory.value,"cateError") 
    && validateProduct(/^([a-zA-Z\s]{10,250})$/,prodDesc.value,"descError")) {

    var product = {
    name:prodName.value,
    price:prodPrice.value,
    category:prodCategory.value,
    description:prodDesc.value
}
    productList.splice(productUpdateVAlue,1,product);
    addToLocalStorage()
    displayProduct(productList);
    clearProduct();
    document.getElementById("add").classList.remove("d-none");
    document.getElementById("update").classList.add("d-none");
}

}



function searchProduct() {
    var matchedList = [];
    var input = document.getElementById("psearch").value;
for(var i = 0 ; i<productList.length; i++) {
    if(productList[i].name.toLowerCase().includes(input.toLowerCase())) {
        productList[i].newName=productList[i].name.toLowerCase().replace(input,`<span class=" text-danger fw-bolder">${input}</span>`);
        matchedList.push(productList[i]);
        displayProduct(matchedList);
    }
}
if(matchedList.length==0){
document.getElementById("products").innerHTML = "No Item Were Found , Please Write a Correct Item";
}
}

function validateProduct(regularex,productValue,classID) {
    var regex = regularex;
    var isVAlid = regex.test(productValue);
    if(isVAlid){
        document.getElementById(classID).classList.replace("d-inline-block","d-none");

    }else {
        document.getElementById(classID).classList.replace("d-none","d-inline-block");
    }
    return isVAlid
}




