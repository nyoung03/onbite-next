import type { AnimeData } from "@/types";
import Link from "next/link";
import style from "./anime-item.module.css";

export default function AnimeItem({
  mal_id,
  title_english,
  genres,
  score,
  synopsis,
  images
}: AnimeData) {
  return (
    <Link href={`/anime/${mal_id}`} className={style.container}>
      <img src={images.jpg.image_url} />
      <div>
        <div className={style.title}>{title_english}</div>
        <div className={style.subTitle}>{score}</div>
        <br />
        <div className={style.author}>
          {genres.map((i) => (
            <div className={style.genre}> {i.name} |</div>
          ))}
        </div>
      </div>
    </Link>
  );
}
