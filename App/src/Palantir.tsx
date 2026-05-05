
function LogWatchTime(startTime: Date, videoDuration: number) {
    const now = new Date();
    const todayString = now.getUTCFullYear() + "/" + now.getUTCMonth() + "/" + now.getUTCDay();

    const timeWatched: number = now.getTime() - startTime.getTime();
    const percentWatched = timeWatched / (videoDuration * 1000);
    console.log(timeWatched, videoDuration, percentWatched);
    const timeWatchedToday = parseInt(localStorage.getItem(todayString) || "0") || 0;
    const vNum = parseInt(localStorage.getItem(todayString + "vNum") || "0") || 0;
    const smol = {
        watchTime: timeWatched,
        progress: percentWatched,
    }
    localStorage.setItem(todayString + "vNum", (vNum + 1).toString());
    //localStorage.setItem(todayString + "v" + vNum, timeWatched.toString());
    localStorage.setItem(todayString + "v" + vNum, JSON.stringify(smol));
    localStorage.setItem(todayString, (timeWatchedToday + timeWatched).toString());
}

sessionStorage.setItem("SessionStart", new Date().getTime().toString());
window.onbeforeunload = LogSession;
function LogSession() {
    if (sessionStorage.getItem("SessionStart") === null) return;

    const now = new Date();
    const todayString = now.getUTCFullYear() + "/" + now.getUTCMonth() + "/" + now.getUTCDay();
    const sessionStart = parseInt(sessionStorage.getItem("SessionStart") || "0") || 0;

    const sNum = parseInt(localStorage.getItem(todayString + "sNum") || "0") || 0;

    const sessionTime = now.getTime() - sessionStart;

    localStorage.setItem(todayString + "sNum", (sNum + 1).toString());
    localStorage.setItem(todayString + "s" + sNum, sessionTime.toString());
}

function DayTime() {
    const now = new Date();
    const todayString = now.getUTCFullYear() + "/" + now.getUTCMonth() + "/" + now.getUTCDay();

    return parseInt(localStorage.getItem(todayString) || "0") / 1000;
}

interface dataExport {
    [date: string]: DaySummary
}

function exportData() {
    const object: dataExport = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || "";
        const regex = /[a-z]+/gid.exec(key);
        let date = key
        if (regex !== null) date = key.substring(0, regex.index)

        console.log(object[date]);
        if (object[date] === undefined) object[date] = {
            sessionTimes: [],
            videoWatchTimes: [],
            videoProgress: [],
        };

        console.log(object);
        if (regex === null) { //This is a day watch time summary
            object[date].date = key
            object[date].totalWatchTime = parseInt(localStorage.getItem(key) || "");
        } else if (regex[0] == "v") {
            const JSon = JSON.parse(localStorage.getItem(key) || "{}");
            object[date].videoWatchTimes.push(JSon.watchTime)
            object[date].videoProgress.push(JSon.progress)
        } else if (regex[0] == "vNum") {
            object[date].totalVideos = parseInt(localStorage.getItem(key) || "");
        } else if (regex[0] == "s") {
            object[date].sessionTimes.push(parseInt(localStorage.getItem(key) || ""));
        } else if (regex[0] == "sNum") {
            object[date].totalSessions = parseInt(localStorage.getItem(key) || "");
        }
    }

    const JSonString = JSON.stringify(object);
    navigator.clipboard.writeText(JSonString);

    alert(JSonString);
}

type DaySummary = {
    date?: string
    totalWatchTime?: number,
    totalVideos?: number,
    totalSessions?: number,
    sessionTimes: number[],
    videoWatchTimes: number[],
    videoProgress: number[],
}

function TodayString() {
    const now = new Date();
    return now.getUTCFullYear() + "/" + now.getUTCMonth() + "/" + now.getUTCDay();
}

const pal = {
    LogWatchTime,
    DayTime,

    exportData,
    TodayString
}

export default pal;


//Daily use time    ()
//Session time      (R U HOOKED?)
//Videos per day    ()
//video watch %     (Attention span?)
