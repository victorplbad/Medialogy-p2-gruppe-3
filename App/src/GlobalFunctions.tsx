import API_KEY from "./API_KEY";
import type { Video } from "./VideoType";

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

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------Youtube API implementation---------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

    const videos: Video[] = data.items.map((item: any) => ({
        ID: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        duration: formatDuration(item.contentDetails.duration),
    }));

    return videos
};

function formatDuration(iso: string) {
    const match = iso.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match?.[1]?.replace("M", "") || "0";
    const seconds = match?.[2]?.replace("S", "") || "00";
    return `${minutes}:${seconds.padStart(2, "0")}`;
};

let vHistory: string[] = [];

export function populateResults(videos: Video[]) {
    const container = document.getElementById("resultContainer") as HTMLElement;
    container.innerHTML = "";

    videos.forEach((video) => {
        /*HAS to be class and not classname because here we are dealing with browser features instead of react*/
        const vOption = document.createElement("div");
        vOption.addEventListener("click", () => { onClickHandler(video.ID) });/*This is where we pick a new video*/
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
    console.log(vHistory.length + " : " + videoID);
    playVideo(videoID);
}

export function playVideo(videoID: string) {
    overlayHide(); 

    const videoFrame = document.getElementById("videoPlayer") as HTMLElement;
    videoFrame.setAttribute("src", `https://www.youtube.com/embed/${videoID}?autoplay=1`);
    showVideoPlayer();
}

function showVideoPlayer() {
    const videoContainer = document.getElementById("videoPlayer") as HTMLElement;
    videoContainer.classList.remove("remove");
    videoContainer.classList.add("active");

    const selectionContainer = document.getElementById("selector") as HTMLElement;
    selectionContainer.classList.remove("remove");
    selectionContainer.classList.add("exit");
    setTimeout(() => {
        selectionContainer.classList.add("remove");
        selectionContainer.classList.remove("active");
        selectionContainer.classList.remove("exit");
    }, 500);
}

export function showVideoSelector() {
    const selectionContainer = document.getElementById("selector") as HTMLElement;
    selectionContainer.classList.remove("remove");
    selectionContainer.classList.add("active");

    const videoContainer = document.getElementById("videoPlayer") as HTMLElement;
    videoContainer.classList.remove("remove");
    videoContainer.classList.add("exit");
    setTimeout(() => {
        videoContainer.classList.add("remove");
        videoContainer.classList.remove("active");
        videoContainer.classList.remove("exit");
    }, 500);
}

let scrolling: boolean = false;
export function scrollHandler(event: React.WheelEvent) {
    if (scrolling) return;
    //console.log("SCROLL!!!: " + currentVideo + " : " + vHistory.length + " VID: " + vHistory[currentVideo]);
    console.log(vHistory.length);
    //alert(event.deltaY)
    if (event.deltaY > 0) {
        showVideoSelector();
    } else if (event.deltaY < 0 && vHistory.length > 1) {
        vHistory.pop()
        const video = vHistory[vHistory.length - 1];
        if (video !== undefined) playVideo(video);
        //TODO add animation
    } else if (event.deltaY < 0) {
        vHistory = [];
        showVideoSelector();
    }
    scrolling = true;
    setTimeout(() => { scrolling = false }, 500);
}