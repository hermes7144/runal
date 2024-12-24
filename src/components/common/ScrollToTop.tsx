import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // 부드러운 스크롤 (필요 없으면 "auto"로 설정 가능)
    });
  }, [location.pathname]); // 경로가 변경될 때마다 실행

  return null; // 별도의 UI를 렌더링하지 않음
}

export default ScrollToTop;
