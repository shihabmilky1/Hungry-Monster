document.getElementById('button').addEventListener('click', function () {
    const inputValue = document.getElementById('input-value').value;
    if (inputValue == '') {
        document.getElementById('alert-empty').style.display = 'block';
        document.getElementById('col').innerHTML = ``;
    }//end if
    else {
        document.getElementById('alert-empty').style.display = 'none'; 
        document.getElementById('col').innerHTML = ``;
        const url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        //api call
        toggleSpinner(true);
        fetch(url)
            .then(res => res.json())
            .then(data => foodInfo(data.meals));
        //show data by call api
        const foodInfo = foodInfo => {
            if (foodInfo === null) {
                document.getElementById('alert-error').style.display = "block"
            }

            else {
                document.getElementById('alert-error').style.display = "none"

            }

            foodInfo.forEach(foods => {
                const newRow = document.getElementById('col');
                const newCol = document.createElement('div');
                const addClass = newCol.className = 'col-md-3 pb-4';
                newCol.innerHTML = `
        <div class="card card-food card-hover"  onclick="foodDetails('${foods.strMeal}')">
  <img class="card-img-top" src="${foods.strMealThumb}" alt="Card image cap">
  <div class="card-body">
  <h4 class="card-title text-center">${foods.strMeal}</h4>
  </div>
  <div class="card-footer d-none"></div>
</div>`
                newRow.appendChild(newCol);
            });
            document.getElementById('input-value').value = "";
            toggleSpinner(false);

        }//end foodInfo
    }//end else
});//end click handler
const foodDetails = name => {
    const url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    fetch(url)
        .then(res => res.json())
        .then(data => foodInfo(data.meals[0]));
};//end foodDetails
const foodInfo = foodInfo => {
    const list = document.getElementById('food-full-data');
    list.innerHTML = `
            <div class="card w-50 card-info card-food mb-5" >
            <img class="card-img-top img-fluid" src="${foodInfo.strMealThumb}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title text-center">${foodInfo.strMeal}</h5>
              <h4 class="mb-4">Ingredient</h4>
              <p class="text-muted"><i class="fas fa-check-circle me-2 text-dark"></i>${foodInfo.strIngredient1}</p>
              <p class="text-muted"><i class="fas fa-check-circle me-2 text-dark"></i>${foodInfo.strIngredient2}</p>
              <p class="text-muted"><i class="fas fa-check-circle me-2 text-dark"></i>${foodInfo.strIngredient3}</p>
              <p class="text-muted"><i class="fas fa-check-circle me-2 text-dark"></i>${foodInfo.strIngredient4}</p>
              <p class="text-muted"><i class="fas fa-check-circle me-2 text-dark"></i>${foodInfo.strIngredient5}</p>
              <p class="text-muted"><i class="fas fa-check-circle me-2 text-dark"></i>${foodInfo.strIngredient6}</p>
              <p class="text-muted"><i class="fas fa-check-circle me-2 text-dark"></i>${foodInfo.strIngredient7}</p>
            </div>
  <button class="btn btn-outline-dark d-block mx-3">Order Now</button>

          </div>
            </div>
            `
}//end foodInfo
const inputValue = document.getElementById("input-value");

inputValue.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.keyCode == 13){
    document.getElementById("button").click();}
});
const toggleSpinner = (show) => {
    const spinner = document.getElementById('spinner');  
    spinner.classList.toggle('d-none');  
} 