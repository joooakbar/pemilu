export function usePartisipasi(totalDPT: number, totalSuara: number) {
  return totalDPT > 0 ? ((totalSuara / totalDPT) * 100).toFixed(1) : "0";
}
