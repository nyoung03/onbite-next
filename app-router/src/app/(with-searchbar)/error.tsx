"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// 동일 경로, 하위 경로에 적용됨
// reset 클라이언트 측에서 재렌더링 하는 함수
export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h3>거걱오류가 발생했습니다</h3>
      {/* 강제 새로고침 (우아한 방법은 아님) => window.location.reload() */}

      <button
        onClick={() => {
          // 하나의 콜백 함수를 인수로 전달 받아서 콜백 함수 안에 있는 UI를 변경 시키는 작업들을 모두 일괄적으로 처리해줌
          startTransition(() => {
            // router.refresh() = 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 (에러 상태가 초기화되지는 않음, 비동기 동작)
            router.refresh();
            // 에러 상태를 초기화, 컴포넌트를 다시 랜더링
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
