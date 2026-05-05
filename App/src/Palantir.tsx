
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

function SesTime() {
    const now = new Date();
    const todayString = now.getUTCFullYear() + "/" + now.getUTCMonth() + "/" + now.getUTCDay();

    //for (let i = 0; i < localStorage.length; i++) {
    //    const key = localStorage.key(i);
    //    if (key === todayString + "sNum") {
    //        const otherKey = localStorage.key(i - 1);
    //        return localStorage.getItem
    //    }
    //}
}

function TodayString() {
    const now = new Date();
    return now.getUTCFullYear() + "/" + now.getUTCMonth() + "/" + now.getUTCDay();
}


const pal = {
    LogWatchTime,
    DayTime,

    TodayString
}

export default pal;


//Daily use time    ()
//Session time      (R U HOOKED?)
//Videos per day    ()
//video watch %     (Attention span?)
