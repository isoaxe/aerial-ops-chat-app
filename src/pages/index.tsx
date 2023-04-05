/**
 * This is a Next.js page.
 */
import { CSSProperties } from 'react';
import { Container } from '@mantine/core';
import SortBar from '~/components/SortBar';
import MessageBar from '~/components/MessageBar';
import Messages from '~/components/Messages';
import { trpc } from '~/utils/trpc';
import { Message } from '~/utils/types';

export default function IndexPage() {
  const { data } = trpc.listMsgs.useQuery(
    { placeholder: 3 },
    { refetchInterval: 5000 },
  );
  const msgs = data as unknown as Message[];

  return (
    <Container style={styles}>
      <SortBar />
      <Messages msgs={msgs} />
      <MessageBar />
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
