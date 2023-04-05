import { CSSProperties } from 'react';
import { Select, Button } from '@mantine/core';

export default function SortBar() {
  return (
    <div style={styles}>
      <Select
        placeholder='Sort by...'
        data={[
          { value: 'date', label: 'Sort by Date & Time' },
          { value: 'message', label: 'Sort by Message' },
        ]}
        style={{ maxWidth: 250 }}
      />
      <Button variant='outline'>Asc</Button>
      <Button variant='outline'>Desc</Button>
    </div>
  );
}

const styles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '5px',
  borderBottom: '2px solid #0798d3',
  backgroundColor: '#fff',
};
