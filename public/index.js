
console.log("tesing the index.js file");

let boxOne = document.getElementsByClassName("Shape")[0];

document.getElementsByClassName("toggleButton")[0].onclick = function(){
    if (this.innerHTML === "Next") {
        this.innerHTML = "Pause";
        boxOne.classList.add("horizTranslate");
       
    }
    else{
        this.innerHTML = "Next";
        let computedStyle = window.getComputedStyle(boxOne), marginLeft = computedStyle.getPropertyValue("margin-left");

        boxOne.style.marginLeft = marginLeft;
        boxOne.classList.remove("horizTranslate");
        boxOne.style.marginLeft = marginLeft;
    }

}

document.querySelector("button").addEventListener("click", function(){
    console.log("you just clicked on the button");


    document.querySelector(".container").classList.add("hide");
});

