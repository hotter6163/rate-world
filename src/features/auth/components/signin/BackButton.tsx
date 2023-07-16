'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Props {
  isIntercept?: boolean;
}

export const BackButton: FC<Props> = ({ isIntercept }) => {
  const router = useRouter();

  // TODO: 別の方法では停止たい
  return isIntercept ? (
    <button className="text-sm font-normal underline" onClick={() => router.back()}>
      閉じる
    </button>
  ) : (
    <Link href="/">
      <p className="text-sm font-normal underline">ホームに戻る</p>
    </Link>
  );
};
