let yearItems = document.getElementsByClassName("yearLabel");

for (let i = 0; i < yearItems.length; i++) {
    let item = yearItems[i];
    let itemIcon = item.firstChild;

    if (i > 2) {
        item.parentElement.lastChild.style.display = "none";
        itemIcon.classList.add("fa-caret-right");
        itemIcon.classList.remove("fa-caret-down");
    } else {
        item.parentElement.lastChild.style.display = "block";
        itemIcon.classList.remove("fa-caret-right");
        itemIcon.classList.add("fa-caret-down");
    }

    item.style.display = "block";
    item.style.cursor = "pointer";
    
    item.addEventListener("click", () => {
        let list = item.parentElement.lastChild;
        if (list.style.display == "none") {
            list.style.display = "block";
            itemIcon.classList.remove("fa-caret-right");
            itemIcon.classList.add("fa-caret-down");
        } else if (list.style.display == "block") {
            list.style.display = "none";
            itemIcon.classList.add("fa-caret-right");
            itemIcon.classList.remove("fa-caret-down");
        }
    });
}