/**
 * This is a Next.js page.
 */
import { CSSProperties } from 'react';
import { Container } from '@mantine/core';
import { trpc } from '../utils/trpc';
import SortBar from '../components/SortBar';
import MessageBar from '../components/MessageBar';
import Messages from '~/components/Messages';

export default function IndexPage() {
  return (
    <Container style={styles}>
      <SortBar />
      <Messages />
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
