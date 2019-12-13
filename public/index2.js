console.log("tesing the index2.js file");
//!THIS LINE OF CODE NEEDS TO CHANGED
let updButtonEl = document.querySelector('.toggleButton');
let dltButtonEl = document.querySelector('.toggleButton2');

updButtonEl.addEventListener('click',event=>{
    console.log("you have clicked on the update button");
});//end of listener

dltButtonEl.addEventListener('click', event=>{
    console.log("you have clicked on the new button");
});

    