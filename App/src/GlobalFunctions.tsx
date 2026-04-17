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
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&q=${query}&key=${API_KEY}`
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
        id: item.id,
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

export function populateResults(videos: Video[]) {
    const container = document.getElementById("resultContainer") as HTMLElement;
    let newInner = "";
    videos.forEach((video) => {
        newInner += `
        <div className="portrait search" key=${video.ID}
            <img src=${video.thumbnail} />
            
            <div className="ThumbOverlay">
                <span className="title">${video.title}</span>
                <span className="duration">${video.duration}</span>
            </div>
        </div>`;
    })
    container.innerHTML = newInner;
};

