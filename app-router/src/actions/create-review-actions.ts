"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const res = await fetch("/review", {
      method: "POST",
      body: JSON.stringify({ bookId, content, author })
    });

    // 해당 함수가 호출되면서 Next 서버가 자동으로 해당하는 페이지를 재검증
    // 오직 서버측에서만 호출 가능
    // 모든 캐시를 재생성함
    // 풀라이트캐시와 데이터 캐시를 purge(제거) 해버림
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
