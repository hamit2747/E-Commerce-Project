const categoryList =document.querySelector('.categories')
const productList = document.querySelector('.products')
const modal = document.querySelector('.model-wrapper')
const openBtn =document.querySelector('#open-btn')
const closeBtn =document.querySelector('#close-btn')
const modalList=document.querySelector('.modal-list')
const modalInfo = document.querySelector('#modal-info')



//sayfa yüklendğinde önce html i yükle daha sonra js çalışsın
document.addEventListener('DOMContentLoaded',() =>{//callback> içerisinde farklı fonksiyonlar çalştırır
    fetchCategories()
    fetchProducts()

}
)

function fetchCategories (){

    //ver çekme isteği atma
fetch('https://api.escuelajs.co/api/v1/categories')

//gelen veriyi işleme
.then((res)=> res.json())

//forEach ile her bir obje için ekrana basma
.then((data)=>
data.slice(1,4).forEach((category)=>{
    //!console.log(category); console yazdırıp içerisindeki name veya diğer değişknleri izleyip ona göre bactick içerisine yazılacakları belirledik
   
    //gelen her bir obje için div oluşturma
    const categoryDiv =document.createElement('div');
    
    //div 'e class ekleme
    categoryDiv.classList.add('category');
    categoryDiv.innerHTML =`<img src="${category.image}">
    <span>${category.name}</span>`
    
    //oluşan divi htmldeki listeye ekleme
    categoryList.appendChild(categoryDiv);

})

)
.catch()
}

fetchCategories();


//ürünleri çekmek için
function fetchProducts(){
    fetch('https://api.escuelajs.co/api/v1/products')
    .then((res) => res.json())
    .then((data) => {
        data.slice(1, 25).forEach((item) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
            <img src="${item.images[1]}">  
                <p class="title">${item.title}</p>
                <div class="product-action">
                    <p>${item.price} &#36;</p>
                    <button onclick="addToBasket({id:'${item.id}' , title:'${item.title}',price:${item.price},img:'${item.images[0]}',amount:'1'})">Sepete Ekle</button>
                </div>
            `;
            //oluşan ürünü html deki liteye gönderme
            productList.appendChild(productDiv);
        });
    })
    .catch((error) => {
        console.error('Bir hata oluştu:', error);
    });
}

//sepet 
let basket =[]
let total = 0;

//sepete ekleme işlemi
function addToBasket(product) {
 
    //sepete parametre olarak gelen elemanın ıd si ile dışarıdan gelen elemanın id si eşit ise alert e yaz
  const foundItem = basket.find((basketItem)=>basketItem.id === product.id)

   if (foundItem) {
    foundItem.amount++
//değilse ürünleri çek yaz    
}else{
    basket.push(product);
   }
   console.log(basket)

   
   
   
}

//açma kapatma
openBtn.addEventListener('click',()=>{
   modal.classList.add('active');
   //sepetin içine ürünleri listeleme
 addList()
 //toplam bilgisni güncelleme
 modalInfo.innerText = total
})


closeBtn.addEventListener('click',()=>{
modal.classList.remove('active');

modalList.innerHTML = ''//!müşteri sepete ürün ekleyip sepeti kapatıp tekrar sepeti açarsa aynı ürünü tekrar eklmeyi engeller

//toplam değerini sıfırlama
total = 0


                

});



//sepete listeleme 
function addList(){
    basket.forEach((product)=>{
        console.log(product)
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
        <img src=${product.img} >
        <h2>${product.title}</h2>
        <h2 class="price"> ${product.price}  $  </h2>
        <h2 >${product.amount}</h2>
        <button id="del" onclick="deleteItem({id:${product.id},price:${product.price} , amount:${product.amount}})" >Sil</button>`

        //elemanı listeye gönderme
        modalList.appendChild(listItem);
        //toplam değişkenini güncelleme
        total += product.price * product.amount;
         });
 }

 //sepetten silme fonksiyonu
 function deleteItem(deletingItem) {
    basket = basket.filter((i)=>i.id !== deletingItem.id)
    //silinen elemanın fiyatını totalden çıkarma
    total -=deletingItem.price*deletingItem.amount
    //total fiyatın güncel halini modalInfo ya ekle
    modalInfo.innerText = total
    
     }

     modalList.addEventListener("click",(e)=>{
        if(e.target.id === 'del'){
            e.target.parentElement.remove()
            //olayı üst elemanlara yayılmasını önler sil düğmesine basıldığında bütün ürünler siliniyordu biz bunu önlemek için stopPropagation kullandık 
            e.stopPropagation();
        }
     });
    

//eğer dışarı tıklarsa kapatma (classlistlerde contains kullanılır includes kullanılmaz hata verir)
modal.addEventListener('click',(e)=> {
    if(e.target.classList.contains('model-wrapper')){modal.classList.remove('active');
}



                
})

