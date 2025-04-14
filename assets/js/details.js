const getCategoryProducts = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const {data} = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return data;
    
}


const diplayProducts = async ()=>{
    const products = await getCategoryProducts();
    const res =  `<h1 class = "proCategory">${products[0].category}</h1>`;
   
     const result =  products.map(function(product){
        return `
            <div class = "product">
               <img src = "${product.image}" class = "product-image"/>
               <h2 class="titlePro">${product.title}</h2>
               <button class ="price">Price : ${product.price}$</button>
            </div>
        `
    }).join(' ');
    
    document.querySelector(".products .row").innerHTML = result;
    document.querySelector(".products .categoryTitle").innerHTML = res;
    document.querySelector(".loading").classList.add("d-none");
    document.querySelector(".header").classList.remove("d-none");
    
    customModal();
}

diplayProducts();

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
  }
  

