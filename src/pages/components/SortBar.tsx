import { CSSProperties } from 'react';
import { Select, Button } from '@mantine/core';

export default function SortBar() {
  return (
    <div style={styles}>
      <Select
        placeholder='Sort by...'
        data={[
          { value: 'time', label: 'Sort by Time' },
          { value: 'date', label: 'Sort by Date' },
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
  boxShadow: '0 4px 2px -2px gray',
  backgroundColor: '#fff',
};
