import style from "./page.module.css";

export default async function Page({
  params
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const id = (await params).id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/anime/${id}/full`
  );

  const data = await res.json().then((res) => res.data);

  const { mal_id, title_english, score, synopsis, genres, images } = data;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${images.jpg.image_url}')` }}
      >
        <img src={images.jpg.image_url} />
      </div>
      <div className={style.title}>{title_english}</div>
      <div className={style.subTitle}>{score}</div>
      <div className={style.author}>
        {genres.map((i: { name: string }) => (
          <div className={style.genre}> {i.name} |</div>
        ))}
      </div>
      <div className={style.description}>{synopsis}</div>
    </div>
  );
}
