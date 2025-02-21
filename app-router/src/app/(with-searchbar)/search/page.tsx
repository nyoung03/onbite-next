// 서버 컴포넌트이기 때문에 async 사용 가능
import AnimeItem from "@/components/anime-item";
import { AnimeData } from "@/types";

// 서버 컴포넌트는 서버측에서 사전 렌더링을 위해 한번만 실행 => 비동기적으로 실행되어도 문제X
export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ q: string }>;
}) {
  // query string, url param과 같이 경로상에 포함되는 값들이 컴포넌트 props로 전달됨

  const { q } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/anime?sfw&min_score=6&limit=10&q=${q}`
  );

  if (!res.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const searchAnime: AnimeData[] = await res.json().then((res) => res.data);

  if (searchAnime.length === 0) {
    return <div>입력하신 애니메이션이 없습니다.</div>;
  }

  return (
    <div>
      {searchAnime.map((anime) => (
        <AnimeItem key={anime.mal_id} {...anime} />
      ))}
    </div>
  );
}
