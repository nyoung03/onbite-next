// 서버 컴포넌트이기 때문에 async 사용 가능
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

// 서버 컴포넌트는 서버측에서 사전 렌더링을 위해 한번만 실행 => 비동기적으로 실행되어도 문제X
export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ q: string }>;
}) {
  // query string, url param과 같이 경로상에 포함되는 값들이 컴포넌트 props로 전달됨

  const { q } = await searchParams;
  console.log(q);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
