export const getYear = () => {
  const today = new Date();

  // 25년도 데이터에 중복 id 값 이슈로 -1 추가
  return today.getFullYear() - 1;
};
