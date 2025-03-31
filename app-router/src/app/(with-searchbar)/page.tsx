import AnimeItem from "@/components/anime-item";
import style from "./page.module.css";
import { AnimeData } from "@/types";
import { getSeason } from "@/util/getSeason";
import { getYear } from "@/util/getYear";
import { Suspense } from "react";

// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
// 약간 막무가내로 무조건 설정됨
// 특별한 상황이 아니면 권장되지 않는다.
// export const dynamic = "auto";
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유가 있다면 빌드시 에러발생)

async function AllAnime() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_SERVER_URL
    }/seasons/${getYear()}/${getSeason()}?sfw`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const allAnime: AnimeData[] = await res.json().then((res) => res.data);

  return (
    <div>
      {allAnime.map((anime) => (
        <AnimeItem key={anime.mal_id} {...anime} />
      ))}
    </div>
  );
}

async function Top5Books() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/top/anime?sfw&limit=5`,
    { next: { revalidate: 3 } }
  );

  if (!res.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const topAnime: AnimeData[] = await res.json().then((res) => res.data);

  return (
    <div>
      {topAnime.map((anime) => (
        <AnimeItem key={anime.mal_id} {...anime} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>랭킹 TOP5 애니</h3>
        <Suspense fallback={<div>Top5Books...</div>}>
          <Top5Books />
        </Suspense>
      </section>
      <section>
        <h3>{getSeason().toUpperCase()} Season 애니</h3>
        <Suspense fallback={<div>AllAnime...</div>}>
          <AllAnime />
        </Suspense>
      </section>
    </div>
  );
}
