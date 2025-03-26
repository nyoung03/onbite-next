import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 해당 서치바 레이아웃은 클라이언트 라우터 캐시에 저장되어 페이지 이동을 하여도 다시 렌더링이 되고 있지 않다 */}
      {/* 새로고침 시 재렌더링 => 클라이언트 라우터 캐시는 새로고침시 새로 렌더링 */}
      {/* <div>{new Date().toLocaleString()}</div> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
