



function switchMenu(ID: string) {
    if (ID === "settings") {
        document.getElementById("searchbar")?.classList.add("hide");
    } else {
        document.getElementById("searchbar")?.classList.remove("hide");
    }
    const elements = Array.from(document.getElementsByClassName("menuItem"));
    for (const e of elements) {
        e.classList.add("remove");
    }
    document.getElementById(ID)?.classList.remove("remove");
}
export default switchMenu;