import AnimeItemSkeleton from "./anime-item-skeleton";

export default function AnimeListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <AnimeItemSkeleton key={idx} />);
}
