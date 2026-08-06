/**
 * Formats a date string, timestamp, or ISO string into a relative time string (e.g. "12m ago", "2h ago").
 */
export function formatTimeAgo(publishedAt?: string | number | Date, fallbackTimeAgo?: string): string {
  if (!publishedAt && fallbackTimeAgo && fallbackTimeAgo !== 'Just now') {
    return fallbackTimeAgo;
  }

  if (!publishedAt) {
    return '12m ago';
  }

  const dateMs = typeof publishedAt === 'number' ? publishedAt : new Date(publishedAt).getTime();
  if (isNaN(dateMs) || dateMs <= 0) {
    return fallbackTimeAgo || '15m ago';
  }

  const now = Date.now();
  const diffMinutes = Math.floor((now - dateMs) / (1000 * 60));

  if (diffMinutes < 2) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks}w ago`;
}
