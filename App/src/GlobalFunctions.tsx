import API_KEY from "./API_KEY";
import type { Video } from "./VideoType";

export function overlayToggle() {
    const overlay = document.getElementsByClassName("overlay")[0];
    if (overlay.classList.contains("show")) overlayHide();
    else overlayShow();
}

export function overlayHide() {
    document.getElementsByClassName("overlay")[0].classList.remove("show");
    document.getElementsByClassName("weirdButton")[0].innerHTML = "Open overlay";
}

export function overlayShow() {
    document.getElementsByClassName("overlay")[0].classList.add("show");
    document.getElementsByClassName("weirdButton")[0].innerHTML = "Close overlay";
}

export function switchMenu(ID: string) {
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

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------Youtube API implementation---------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

let vInfo: Video[];

export async function doSearch(query: string) {
    const results = await search(query);
    //console.log(results);
    vInfo = await getVideoInfo(results);
    //console.log(vInfo);
    populateResults(vInfo);
    //search(event.currentTarget.value).then((results) => { getVideoInfo(results));
    switchMenu("search_results");
}



export async function search(query: string) {
    const reply = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&videoDuration=short&type=video&q=${encodeURIComponent(query + " #short")}&key=${API_KEY}`
    );
    
    const data = await reply.json();
    //console.log(data.items.map((item) => { return item.id.videoId }));
    //console.log(data.items);
    return data.items.map((item) => { return item.id.videoId });
};

export async function getVideoInfo(VideoIDs: string[]) {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${VideoIDs.join(",")}&key=${API_KEY}`
    );

    const data = await res.json();

    const videos: Video[] = data.items.map((item) => ({
        ID: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        duration: formatDuration(item.contentDetails.duration),
    }));

    return videos;
};

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------Search result menu filling---------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export function populateResults(videos: Video[]) {
    const container = document.getElementById("resultContainer") as HTMLElement;
    container.innerHTML = "";

    videos.forEach((video) => {
        /*HAS to be class and not classname because here we are dealing with browser features instead of react*/
        const vOption = document.createElement("div");
        vOption.addEventListener("click", () => { onClickHandler(video.ID) });
        vOption.setAttribute("class", "portrait search");
        const vImg = document.createElement("img");
        vImg.setAttribute("src", video.thumbnail);
        const vTitle = document.createElement("span");
        vTitle.setAttribute("class", "title");
        vTitle.innerHTML = video.title;
        const vDuration = document.createElement("span");
        vDuration.setAttribute("class", "duration");
        vDuration.innerHTML = video.duration;
        const vDiv = document.createElement("div");
        vDiv.setAttribute("class", "ThumbOverlay");
        vDiv.append(vTitle);
        vDiv.append(vDuration);

        vOption.append(vImg);
        vOption.append(vDiv);

        container.append(vOption);
    })
};

export function onClickHandler(videoID: string) {
    vHistory.push(videoID);
    scrollPlayer(false);
    playVideo(videoID);
}

//function result(video: Video) {
//    return (
//        <div className="portrait search" onClick={() => onClickHandler(video.ID)}>
//            <img src={video.thumbnail} />
//            <div className="ThumbOverlay">
//                <span className="title">{video.title}</span>
//                <span className="duration">{video.duration}</span>
//            </div>
//        </div>
//    )
//}

function formatDuration(iso: string) {
    const match = iso.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match?.[1]?.replace("M", "") || "0";
    const seconds = match?.[2]?.replace("S", "") || "00";
    return `${minutes}:${seconds.padStart(2, "0")}`;
};

let vHistory: string[] = [];

let activeContainer: HTMLElement;
let upperContainer: HTMLElement;
let lowerContainer: HTMLElement;

export function playVideo(videoID: string) {
    overlayHide();
    showVideoPlayer();

    activeContainer.children[0].setAttribute("src", `https://www.youtube.com/embed/${videoID}?autoplay=1`)
    upperContainer.children[0].setAttribute("src", `about:blank`)
    lowerContainer.children[0].setAttribute("src", `about:blank`)
}

function scrollPlayer(down: boolean) {
    if (activeContainer == null) activeContainer = document.getElementById("vContainer1") as HTMLElement;
    if (upperContainer == null) upperContainer = document.getElementById("vContainer2") as HTMLElement;
    if (lowerContainer == null) lowerContainer = document.getElementById("vContainer3") as HTMLElement;

    if (down) {
        //Move active elements down
        activeContainer.classList.add("down");
        upperContainer.classList.remove("up");
        upperContainer.classList.remove("hide");
        //Handle wraparound
        lowerContainer.classList.remove("down");
        lowerContainer.classList.add("up");
        lowerContainer.classList.add("hide");
        //Swap variables around
        const tmp = upperContainer;
        upperContainer = lowerContainer;
        lowerContainer = activeContainer;
        activeContainer = tmp;
    } else {
        //Move active elements up
        activeContainer.classList.add("up");
        lowerContainer.classList.remove("down");
        lowerContainer.classList.remove("hide");
        //Handle wraparound
        upperContainer.classList.remove("up");
        upperContainer.classList.add("down");
        upperContainer.classList.add("hide");
        //Swap variables around
        const tmp = lowerContainer;
        lowerContainer = upperContainer;
        upperContainer = activeContainer;
        activeContainer = tmp;
    }
}

function showVideoPlayer() {
    setTimeout(() => {
        const selector = document.getElementById("selector") as HTMLElement;
        selector.classList.add("remove");
    }, 500);

    const iFrame = activeContainer.children[0] as HTMLElement;
    iFrame.classList.remove("remove");
}

export function showVideoSelector() {
    const selector = document.getElementById("selector") as HTMLElement;
    selector.classList.remove("remove");

    const iFrame = activeContainer.children[0] as HTMLElement;
    iFrame.classList.add("remove");

    activeContainer.appendChild(selector);
    PowerfullAlgorime();
}

let scrolling: boolean = false;
export function scrollHandler(event: React.WheelEvent) {
    if (scrolling) return;
    scrolling = true;
    setTimeout(() => { scrolling = false }, 500);

    if (event.deltaY > 0 && activeContainer.children.length === 1) {
        console.log("1");
        scrollPlayer(false);
        showVideoSelector();
    } else if (event.deltaY < 0 && vHistory.length > 1) {
        console.log("2");
        vHistory.pop()
        scrollPlayer(true);
        const video = vHistory[vHistory.length - 1];
        if (video !== undefined) playVideo(video);
    } else if (event.deltaY !== 0) {
        console.log("3");
        vHistory = [];
        scrollPlayer(event.deltaY < 0);
        showVideoSelector();
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------algorime result lootbox---------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// function PowerfullAlgorime() {

// videos.forEach((vInfo) => {
//         /*HAS to be class and not classname because here we are dealing with browser features instead of react*/
//         const vOption = document.createElement("div");
//         vOption.addEventListener("click", () => { onClickHandler(video.ID) });
//         vOption.setAttribute("class", "portrait search");
//         const vImg = document.createElement("img");
//         vImg.setAttribute("src", video.thumbnail);
//         const vTitle = document.createElement("span");
//         vTitle.setAttribute("class", "title");
//         vTitle.innerHTML = video.title;
//         const vDuration = document.createElement("span");
//         vDuration.setAttribute("class", "duration");
//         vDuration.innerHTML = video.duration;
//         const vDiv = document.createElement("div");
//         vDiv.setAttribute("class", "ThumbOverlay");
//         vDiv.append(vTitle);
//         vDiv.append(vDuration);

//         vOption.append(vImg);
//         vOption.append(vDiv);

//         container.append(vOption);
//     })
//    

// {vInfo.map((v, k) => (
//                         <div
//                             key={k}
//                             className="portrait"
//                             onClick={() => {//Can not be onPointerDown
//                                 onClickHandler(v);
//                             }}
//                         >
//                             <span>K: {k} V: {v}</span>
//                         </div>
//                     ))}

// }
let y = 0;
export async function PowerfullAlgorime() {
    const container = document.getElementById("lootboxContainer") as HTMLElement;
    container.innerHTML = "";
    
    if (vInfo.length - y < 6){
        await doSearch(vInfo[0].title)
        y = 0;
    }
   
    
    for ( let i = 1; i <= 6; i++, y++){
        const video = vInfo[y];

        const vOption = document.createElement("div");
        vOption.addEventListener("click", () => { onClickHandler(video.ID) });
        vOption.setAttribute("class", "portrait search");
        const vImg = document.createElement("img");
        vImg.setAttribute("src", video.thumbnail);
        const vTitle = document.createElement("span");
        vTitle.setAttribute("class", "title");
        vTitle.innerHTML = video.title;
        const vDuration = document.createElement("span");
        vDuration.setAttribute("class", "duration");
        vDuration.innerHTML = video.duration;
        const vDiv = document.createElement("div");
        vDiv.setAttribute("class", "ThumbOverlay");
        vDiv.append(vTitle);
        vDiv.append(vDuration);

        vOption.append(vImg);
        vOption.append(vDiv);

        container.append(vOption);
    }
   
   
};