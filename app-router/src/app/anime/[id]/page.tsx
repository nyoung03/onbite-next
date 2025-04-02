import { notFound } from "next/navigation";
import style from "./page.module.css";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import reviewList from "@/mock/review.json";
import ReviewEditor from "@/components/review-editor";

export function generateStaticParams() {
  return [{ id: "52991" }, { id: "16498" }, { id: "25777" }];
}

async function BookDetail({ id }: { id: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/anime/${id}/full`
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다...</div>;
  }

  const data = await res.json();

  const { mal_id, title_english, score, synopsis, genres, images } = data.data;

  return (
    <section>
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
          <div className={style.genre} key={i.name}>
            {" "}
            {i.name} |
          </div>
        ))}
      </div>
      <div className={style.description}>{synopsis}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  // const res = await fetch(`/review/book/${bookId}`);

  // if (!res.ok) {
  //   throw new Error(`Review fetch failed : ${res.statusText}`);
  // }

  // const reviews: ReviewData[] = await res.json();

  const reviews: ReviewData[] = reviewList;

  return (
    <section>
      {reviews.map((i) => (
        <ReviewItem key={i.id} {...i} />
      ))}
    </section>
  );
}

type tProps = Promise<{ id: string }>;

export default async function Page({ params }: { params: tProps }) {
  const { id } = await params;

  return (
    // 아래의 자식 컴포넌트들이 모두 랜더링됨
    <div className={style.container}>
      <BookDetail id={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
