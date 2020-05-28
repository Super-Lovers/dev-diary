let yearItems = document.getElementsByClassName("yearLabel");
console.log(yearItems);

for (let i = 0; i < yearItems.length; i++) {
    let item = yearItems[i];
    if (i > 1) {
        item.parentElement.lastChild.style.display = "none";
    } else {
        item.parentElement.lastChild.style.display = "block";
    }

    item.style.display = "block"
    item.style.cursor = "pointer"
    
    item.addEventListener("click", () => {
        let list = item.parentElement.lastChild;
        if (list.style.display == "none") {
            list.style.display = "block";
        } else if (list.style.display == "block") {
            list.style.display = "none";
        }
    });
}