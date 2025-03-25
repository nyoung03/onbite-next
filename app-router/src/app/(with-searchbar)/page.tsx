import AnimeItem from "@/components/anime-item";
import style from "./page.module.css";
import { AnimeData } from "@/types";
import { getSeason } from "@/util/getSeason";
import { getYear } from "@/util/getYear";

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
        <Top5Books />
      </section>
      <section>
        <h3>{getSeason().toUpperCase()} Season 애니</h3>
        <AllAnime />
      </section>
    </div>
  );
}
