export function getSeason(): string {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 6) {
    return "spring";
  } else if (month >= 7 && month <= 8) {
    return "summer";
  } else if (month >= 9 && month <= 11) {
    return "fall";
  } else {
    return "winter";
  }
}
