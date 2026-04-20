import { useState, useEffect } from "react";
import type { AppUsageData } from "./useAppTracking.ts";

interface StatsPanelProps {
  getStats: () => AppUsageData;
  clearStats: () => void;
  onClose: () => void;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return "0s";
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  if (m < 60) return `${m}m ${rs}s`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return `${h}h ${rm}m`;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function StatsPanel({ getStats, clearStats, onClose }: StatsPanelProps) {
  const [data, setData] = useState<AppUsageData>(getStats());

  // Refresh every 2s while panel is open
  useEffect(() => {
    const id = setInterval(() => setData(getStats()), 2000);
    return () => clearInterval(id);
  }, [getStats]);

  const avgWatchTime =
    data.totalVideosWatched > 0
      ? Math.round(data.totalWatchTimeMs / data.totalVideosWatched)
      : 0;

  const recentSessions = [...data.sessions].reverse().slice(0, 5);

  const styles = {
    overlay: {
      position: "fixed" as const,
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    panel: {
      background: "#1a1a1a",
      borderRadius: 16,
      padding: 24,
      width: "min(90vw, 360px)",
      color: "#fff",
      fontFamily: "sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: { margin: 0, fontSize: 18, fontWeight: 600 },
    closeBtn: {
      background: "none",
      border: "none",
      color: "#aaa",
      fontSize: 20,
      cursor: "pointer",
      lineHeight: 1,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginBottom: 20,
    },
    card: {
      background: "#2a2a2a",
      borderRadius: 10,
      padding: "12px 14px",
    },
    cardLabel: { fontSize: 11, color: "#888", marginBottom: 4 },
    cardValue: { fontSize: 22, fontWeight: 700, color: "#fff" },
    cardSub: { fontSize: 12, color: "#666", marginTop: 2 },
    section: { marginBottom: 16 },
    sectionTitle: { fontSize: 13, color: "#888", marginBottom: 8 },
    sessionRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      padding: "6px 0",
      borderBottom: "1px solid #2a2a2a",
    },
    sessionLabel: { color: "#ccc" },
    sessionDur: { color: "#aaa" },
    clearBtn: {
      width: "100%",
      padding: "10px 0",
      background: "#3a1a1a",
      border: "1px solid #5a2a2a",
      borderRadius: 8,
      color: "#e77",
      fontSize: 13,
      cursor: "pointer",
      marginTop: 4,
    },
    empty: { color: "#555", fontSize: 13, textAlign: "center" as const, padding: "12px 0" },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Your Usage</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Stat cards */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardLabel}>VIDEOS WATCHED</div>
            <div style={styles.cardValue}>{data.totalVideosWatched}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>TOTAL WATCH TIME</div>
            <div style={styles.cardValue}>{formatDuration(data.totalWatchTimeMs)}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>AVG PER VIDEO</div>
            <div style={styles.cardValue}>{formatDuration(avgWatchTime)}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardLabel}>SESSIONS</div>
            <div style={styles.cardValue}>{data.sessions.length}</div>
          </div>
        </div>

        {/* Recent sessions */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>RECENT SESSIONS</div>
          {recentSessions.length === 0 ? (
            <div style={styles.empty}>No sessions recorded yet</div>
          ) : (
            recentSessions.map((s) => (
              <div key={s.id} style={styles.sessionRow}>
                <span style={styles.sessionLabel}>
                  Thumbnail {s.thumbnailIndex + 1} · {formatTime(s.startTime)}
                </span>
                <span style={styles.sessionDur}>{formatDuration(s.durationMs)}</span>
              </div>
            ))
          )}
        </div>

        {/* Clear */}
        <button
          style={styles.clearBtn}
          onClick={() => {
            clearStats();
            setData(getStats());
          }}
        >
          Clear all data
        </button>
      </div>
    </div>
  );
}
