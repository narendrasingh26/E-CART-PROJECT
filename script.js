var amount = document.getElementById('price');
var product = document.getElementById('product');
var sum =0;
var crudLink = 'https://crudcrud.com/api/a4b96d3c88c144e79ebea198a8e53b60'

document.getElementById('bt').addEventListener('click',storeData)

function storeData(e){
    e.preventDefault();

    let obj = {
        price : amount.value,
        product: product.value
    }
   

     
    axios.post(`${crudLink}/appData`,obj)
    .then((res)=>{
        console.log(res.data);
        let obj = res.data;
        sum = sum + +obj.price;
        let parent = document.getElementById("tvalue");
        let child = `<h5 >Total value worth of products = ₹ ${sum}</h5>`;
        parent.innerHTML = child;
        showOnScreen(obj);

    })
    

}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get(`${crudLink}/appData`)
    .then((res)=>{
        
        for(let el of res.data){
            sum = sum + +el.price;
            showOnScreen(el)
           
        }
        let parent = document.getElementById("tvalue");
        let child = `<h5 >Total value worth of products = ₹ ${sum}</h5>`;
        parent.innerHTML = child;
      
    })
})

function showOnScreen(obj){
    let parent = document.getElementById("list");
    let child = `<li id = "${obj._id}"  >
    ${obj.product} - ₹ ${obj.price}.00
    <button onclick= "deleteItem('${obj._id}',${obj.price})" id="rm">Remove From Cart</button>
    </li>`

    parent.innerHTML= parent.innerHTML + child;
    
}

function deleteItem(uid,price){
    axios.delete(`${crudLink}/appData/${uid}`)

    
    if(price == NaN){
        sum =0
    }else{
        sum = sum - +price;
    } 

    let parent1 = document.getElementById("tvalue");
    let child = `<h5 >Total value worth of products = ₹ ${sum}</h5>`;
    parent1.innerHTML = child;

    var parent =document.getElementById(uid).parentElement;
    parent.removeChild(document.getElementById(uid))
}