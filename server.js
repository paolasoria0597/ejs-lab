const express = require('express');
const app = express();


const RESTAURANT = {
    name: 'The Green Byte Bistro',
    isOpen: true,
    address: '742 Evergreen Rd, Mapleview, OS 45502',
    phone: '555-321-9876',
    menu: [
      { 
        id: 1,
        name: 'Quantum Quinoa Mushroom Burger',
        price: 13.00,
        rating: 4,
        category: 'mains',
        details: 'A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.'
      },
      { 
        id: 2,
        name: 'Binary Berry Cheesecake',
        price: 10.11,
        rating: 3,
        category: 'desserts',
        details: 'A creamy cheesecake bursting with flavor. A mix of berries in every byte.'
      },
      { 
        id: 3,
        name: 'Recursive Rigatoni',
        price: 17.00,
        rating: 5,
        category: 'mains',
        details: 'A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You\'ll keep coming back for more.'
      },
      { 
        id: 4,
        name: 'Pumpkin Pi Squared',
        price: 3.14,
        rating: 5,
        category: 'desserts',
        details: 'A delightful pumpkin dessert, squared and spiced to perfection.'
      },
      { 
        id: 5,
        name: 'Fibonacci String Bean Fries',
        price: 11.23,
        rating: 5,
        category: 'sides',
        details: 'Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.'
      }
    ]
  }
  
const menu = RESTAURANT.menu // extracting menu from RESTAURANTS obj 
const mains = menu.filter((item) => item.category === "mains")
const sides = menu.filter((item) => item.category === "sides")
const desserts = menu.filter((item) => item.category === "desserts")


app.get('/', (req, res) => {
 res.render('home.ejs', {RESTAURANT});
});

app.get('/menu',(req,res) =>{
  res.render('menu.ejs', {
    menu,
    mains,
    sides,
    desserts
  }) 
} );

app.get('/menu/:category', (req,res) => {
  const category = req.params.category // getting the parameter value from the url /:category
  let data // setting a data variable as placeholder for my filtered data 

  if(category === "mains") {
    data = mains // setting stat to mains if the category parameter is mains 
  } else if(category === "sides"){
    data = sides // setting data to sides if the category parameter is sides
  } else {
    data = desserts // anything else is set to desserts 
  }

  // the below capitalizes the word by extracting the first character from thw word using charAt(0), then converting that same extracted first letter of the word 
  // to uppercase with toUppercase(). Then we append or interpolate the remainder of the word by removing the first letter which is lowercase and appending everything else
  //  For exaple, the word sides
  // sides becomes s when we do category.charAt(0)
  // then s becomes S when we do .toUppercase()
  // sides becomes => ides when we do category.slice(1) 
  // finally category.charAt(0).toUpperCase() + category.slice(1) becomes Sides
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1) 
  
  res.render('category.ejs', {
    category: capitalizedCategory,
    data
  })
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
  });