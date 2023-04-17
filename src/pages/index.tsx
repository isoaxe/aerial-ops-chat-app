/**
 * This is a Next.js page.
 */
import { useState, CSSProperties } from 'react';
import { Container, Loader } from '@mantine/core';
import SortBar from '~/components/SortBar';
import MessageBar from '~/components/MessageBar';
import Messages from '~/components/Messages';
import { trpc } from '~/utils/trpc';
import { Message } from '~/utils/types';

export default function IndexPage() {
  const [sortType, setSortType] = useState<string | null>('date');
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const { data, isFetchingNextPage, isLoading, refetch, fetchNextPage } =
    trpc.listMsgs.useInfiniteQuery(
      { sortType, isSortedAsc },
      { getNextPageParam: (lastPage) => lastPage.lastCursor },
    );
  let allMsgs: Message[] = [];
  data?.pages.forEach((page) => {
    page.msgs.forEach((msg) => allMsgs.push(msg as unknown as Message));
  });

  return (
    <Container style={styles}>
      <SortBar
        sortType={sortType}
        setSortType={setSortType}
        isSortedAsc={isSortedAsc}
        setIsSortedAsc={setIsSortedAsc}
      />
      {isLoading ? (
        <Loader variant='bars' size='lg' style={loaderStyle} />
      ) : (
        <Messages
          allMsgs={allMsgs}
          isFetchingNextPage={isFetchingNextPage}
          refetch={refetch}
          fetchNextPage={fetchNextPage}
        />
      )}
      <MessageBar refetch={refetch} />
    </Container>
  );
}

const styles: CSSProperties = {
  width: '400px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '10px',
  padding: '0px',
  borderRadius: '5px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  backgroundColor: '#d0d5d7',
};

const loaderStyle: CSSProperties = {
  display: 'block',
  margin: 'auto',
};
