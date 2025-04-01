import style from "./anime-item-skeleton.module.css";

export default function AnimeItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
      <div className={style.info_container}>
        <div className={style.title}></div>
        <div className={style.subtitle}></div>
        <br />
        <div className={style.author}></div>
      </div>
    </div>
  );
}
