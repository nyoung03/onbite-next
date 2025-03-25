import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 클라이언트 측에서만 실행되도록 */}
      {/* 서버측 사전 렌더링 과정에서 배제 */}
      {/* Searchbar의 비동기 작업이 종료될 때까지 미완성 상태로 남아 있음 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
