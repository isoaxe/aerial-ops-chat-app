/**
 * This is a Next.js page.
 */
import { useState, CSSProperties } from 'react';
import { Container } from '@mantine/core';
import SortBar from '~/components/SortBar';
import MessageBar from '~/components/MessageBar';
import Messages from '~/components/Messages';
import { trpc } from '~/utils/trpc';
import { Message } from '~/utils/types';

export default function IndexPage() {
  const [sortType, setSortType] = useState<string | null>('date');
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const { data, refetch } = trpc.listMsgs.useQuery(
    { placeholder: 3 },
    { refetchInterval: 5000 },
  );
  const msgs = data as unknown as Message[];

  return (
    <Container style={styles}>
      <SortBar
        sortType={sortType}
        setSortType={setSortType}
        isSortedAsc={isSortedAsc}
        setIsSortedAsc={setIsSortedAsc}
      />
      <Messages msgs={msgs} refetch={refetch} />
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
