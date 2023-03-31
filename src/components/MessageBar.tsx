import { CSSProperties } from 'react';
import { Textarea, Button } from '@mantine/core';
import { IconPaperclip } from '@tabler/icons-react';

export default function MessageBar() {
  return (
    <div style={styles}>
      <Textarea
        placeholder='Enter Message...'
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
      <Button variant='filled'>SEND</Button>
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
