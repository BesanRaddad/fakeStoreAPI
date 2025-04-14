

const getProducts = async (page)=>{
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const {data} = await axios.get(`https://fakestoreapi.com/products?`);
    return data;
    
}

const displayProducts = async (page=1)=>{
    const allproducts = await getProducts(page);
    const numberOfPages = Math.ceil(allproducts.length/3);
    let start = (page-1)*3;
    let end = start+3;
    const products = allproducts.slice(start,end);
     const result =  products.map(function(product){
        return `
            <div class = "product">
               <img src = "${product.image}" class = "product-image"/>
               <h2 class="titlePro">${product.title}</h2>
              <button class = "price">Price : ${product.price}$</button>
            </div>
        `
    }).join(' ');
    document.querySelector(".products .row").innerHTML = result;
    document.querySelector(".loading").classList.add("d-none");
    let paginationLink = ``;
    if(page > 1){
         paginationLink = `<li><button  onclick=displayProducts(${page-1})>&lt;</button></li>`;
    }
    else{
         paginationLink = `<li><button  disabled>&lt;</button></li>`;
    }
    for(let i = 1; i <= numberOfPages; i++){
        if(i == page){
            paginationLink += `<li><button class="active" onclick=displayProducts(${i})>${i}</button></li>`;
        }
        else{
            paginationLink += `<li><button  onclick=displayProducts(${i})>${i}</button></li>`;
        }
       
    }
    if(page < numberOfPages){
        paginationLink +=`<li><button onclick=displayProducts(${parseInt(page)+1})>&gt;</button></li>`;
   }
   else{
        paginationLink += `<li><button  disabled>&gt;</button></li>`;
   }
    
    
    document.querySelector(".pagination").innerHTML = paginationLink;

   
    customModal();
   
    
}

displayProducts();

function customModal() {
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".closeBtn");
    const leftBtn = document.querySelector(".leftBtn");
    const rightBtn = document.querySelector(".rightBtn");
    const products = Array.from(document.querySelectorAll(".product"));
    const images = Array.from(document.querySelectorAll(".product-image"));
  
    let currentIndex = 0;
  
    products.forEach(function(product) {
        product.addEventListener("click", (e) => {
        const img = product.querySelector(".product-image");
        const title = product.querySelector(".titlePro");
        const price = product.querySelector(".price");
  
        modal.classList.remove("d-none");
        modal.querySelector("img").setAttribute("src", img.src);
        modal.querySelector(".titlePro").textContent = title.textContent;
        modal.querySelector(".price").textContent = price.textContent;
        const currentImg = e.target;
        currentIndex = images.indexOf(currentImg);
      });
    });
  
    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.classList.add("d-none");
    });
  
    rightBtn.addEventListener('click', (e) => {
        currentIndex++;
        if(currentIndex >= images.length){
            currentIndex = 0;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src", src);
        const title = products[currentIndex].querySelector(".titlePro").innerText;
        const price = products[currentIndex].querySelector(".price").innerText;
        modal.querySelector(".titlePro").textContent = title;
        modal.querySelector(".price").textContent = price;
        
      });

      leftBtn.addEventListener('click', (e) => {
        currentIndex--;
        if(currentIndex < 0){
            currentIndex = images.length-1;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src", src);
        const title = products[currentIndex].querySelector(".titlePro").innerText;
        const price = products[currentIndex].querySelector(".price").innerText;
        modal.querySelector(".titlePro").textContent = title;
        modal.querySelector(".price").textContent = price;
      });

      document.addEventListener("keydown", (e) =>{
        if(e.code == "ArrowRight"){
            currentIndex++;
            if(currentIndex >= images.length){
                currentIndex = 0;
            }
            const src= images[currentIndex].getAttribute("src");
            modal.querySelector("img").setAttribute("src", src);
            const title = products[currentIndex].querySelector(".titlePro").innerText;
            const price = products[currentIndex].querySelector(".price").innerText;
            modal.querySelector(".titlePro").textContent = title;
            modal.querySelector(".price").textContent = price;
        }
    
        else if(e.code == "ArrowLeft"){
            currentIndex--;
                if(currentIndex < 0){
                    currentIndex = images.length-1;
                }
                const src= images[currentIndex].getAttribute("src");
                modal.querySelector("img").setAttribute("src", src);
                const title = products[currentIndex].querySelector(".titlePro").innerText;
                const price = products[currentIndex].querySelector(".price").innerText;
                modal.querySelector(".titlePro").textContent = title;
                modal.querySelector(".price").textContent = price;
          }
    
          else if(e.code == "Escape"){
            modal.classList.add("d-none");
          }
      });
    
  }


 