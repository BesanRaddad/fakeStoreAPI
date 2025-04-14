const getCategories = async () =>{
    const {data} = await axios.get('https://fakestoreapi.com/products/categories');
    return data;
}

  const displayCategories = async () =>{
    const categories = await getCategories();
    const result =  categories.map(function(category){
        return`
        <div class = "category">
           <h3>${category}</h3>
           <a href="./details.html?category=${category}">details</a>
        </div>`;
    }).join(' ');

    document.querySelector(".categorise .row").innerHTML = result;
    document.querySelector(".loading").classList.add("d-none");
    document.querySelector(".header").classList.remove("d-none");
    document.querySelector(".fakeStore").classList.remove("d-none");
  }
  displayCategories();