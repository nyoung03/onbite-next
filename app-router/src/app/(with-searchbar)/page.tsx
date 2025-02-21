import AnimeItem from "@/components/anime-item";
import style from "./page.module.css";
import { AnimeData } from "@/types";

export function getSeason() {
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

async function AllAnime() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/seasons/2024/${getSeason()}?sfw`,
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

async function RecoBooks() {
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
        <RecoBooks />
      </section>
      <section>
        <h3>{getSeason().toUpperCase()} Season 애니</h3>
        <AllAnime />
      </section>
    </div>
  );
}
