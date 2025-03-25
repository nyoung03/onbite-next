import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { AnimeData } from "@/types";
import { getSeason } from "@/util/getSeason";

async function Footer() {
  // 아래 fetch 메서드는 자동으로 no store 옵션을 갖는다
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/seasons/2024/${getSeason()}?sfw`,
    { cache: "force-cache" }
  );

  console.log(getSeason(), "getSeason()");

  if (!res.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const animes: AnimeData[] = await res.json().then((res) => res.data);
  const animesLen = animes.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{animesLen}개의 애니메니션이 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE Anime</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
