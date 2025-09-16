export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let result = "";
  if (minutes > 0) {
    result += `${minutes} minute${minutes !== 1 ? "s" : ""} `;
  }
  if (seconds > 0 || minutes === 0) {
    result += `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }
  return result.trim();
}


export const formatResultsTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hrs.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
}