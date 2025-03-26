import AnimeItem from "@/components/anime-item";
import { AnimeData } from "@/types";

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/anime?sfw&min_score=6&limit=10&q=${q}`,
    { cache: "force-cache" }
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
