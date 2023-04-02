import { useState, CSSProperties } from 'react';
import { Textarea, Button } from '@mantine/core';
import { IconPaperclip } from '@tabler/icons-react';
import { trpc } from '~/utils/trpc';

export default function MessageBar() {
  const [text, setText] = useState('');
  const mutation = trpc.addMsg.useMutation();

  function addMsg() {
    mutation.mutate({ text });
    setText('');
  }

  return (
    <div style={styles}>
      <Textarea
        placeholder='Enter Message...'
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        autosize
        minRows={1}
        maxRows={2}
        style={{ width: 264 }}
      />
      <Button
        variant='outline'
        leftIcon={<IconPaperclip />}
        styles={() => attachButtonStyles}
      />
      <Button variant='filled' onClick={addMsg}>
        SEND
      </Button>
    </div>
  );
}

const styles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '5px',
  boxShadow: '0 4px 2px -2px gray',
  backgroundColor: '#fff',
};

const attachButtonStyles = {
  root: { width: '36px' },
  leftIcon: {
    marginLeft: '15px',
  },
};
