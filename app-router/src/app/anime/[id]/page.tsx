import { notFound } from "next/navigation";
import style from "./page.module.css";

// generateStaticParams에 설정해둔 id 파라미터 외에 모두 다 404페이지로 보내고 싶을때
// export const dynamicParams = false;

// generateStaticParams 정적인 파라미터를 생성하는 함수
// 아래의 3개 id 값의 페이지를 빌드타임에 정적으로 만든다.
// 빌드 타임에 렌더링이 완료되어서 서버측에 풀라우트 캐시로써 잘 보관이 된다.
export function generateStaticParams() {
  // 문자열로만 명시 필요
  // res와 같이 데이터 캐싱을 설정하지 않은 데이터 패칭이 있더라도 페이지가 스테틱 페이지로 강제 설정됨
  return [{ id: "52991" }, { id: "16498" }, { id: "25777" }];
}

type tProps = Promise<{ id: string | string[] }>;

export default async function Page({ params }: { params: tProps }) {
  const { id } = await params;

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
          <div className={style.genre} key={i.name}>
            {" "}
            {i.name} |
          </div>
        ))}
      </div>
      <div className={style.description}>{synopsis}</div>
    </div>
  );
}
