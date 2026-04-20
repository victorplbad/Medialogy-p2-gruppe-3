import { useEffect, useRef, useCallback } from "react";

export interface VideoSession {
  id: number;
  thumbnailIndex: number;
  startTime: number;
  endTime?: number;
  durationMs: number;
}

export interface AppUsageData {
  totalVideosWatched: number;
  totalWatchTimeMs: number;
  sessions: VideoSession[];
  lastUpdated: number;
}

const STORAGE_KEY = "app_usage_data";

function loadData(): AppUsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppUsageData;
  } catch {
    // corrupt data - reset
  }
  return {
    totalVideosWatched: 0,
    totalWatchTimeMs: 0,
    sessions: [],
    lastUpdated: Date.now(),
  };
}

function saveData(data: AppUsageData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.warn("Could not save usage data.");
  }
}

export function useAppTracking() {
  const activeSessionRef = useRef<VideoSession | null>(null);
  const sessionIdCounter = useRef(Date.now());

  const onVideoStart = useCallback((thumbnailIndex: number) => {
    if (activeSessionRef.current) {
      endCurrentSession();
    }
    const session: VideoSession = {
      id: sessionIdCounter.current++,
      thumbnailIndex,
      startTime: Date.now(),
      durationMs: 0,
    };
    activeSessionRef.current = session;
  }, []);

  const onVideoEnd = useCallback(() => {
    endCurrentSession();
  }, []);

  function endCurrentSession() {
    const session = activeSessionRef.current;
    if (!session) return;

    const endTime = Date.now();
    const durationMs = endTime - session.startTime;
    const completedSession: VideoSession = {
      ...session,
      endTime,
      durationMs,
    };

    const data = loadData();
    data.sessions.push(completedSession);
    data.totalVideosWatched += 1;
    data.totalWatchTimeMs += durationMs;
    data.lastUpdated = Date.now();
    saveData(data);

    activeSessionRef.current = null;
  }

  useEffect(() => {
    const flush = () => endCurrentSession();
    window.addEventListener("beforeunload", flush);
    return () => {
      flush();
      window.removeEventListener("beforeunload", flush);
    };
  }, []);

  function getStats(): AppUsageData {
    return loadData();
  }

  function clearStats() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return { onVideoStart, onVideoEnd, getStats, clearStats };
}