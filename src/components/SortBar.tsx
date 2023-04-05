import { useState, CSSProperties } from 'react';
import { Select, Button } from '@mantine/core';

export default function SortBar() {
  const [sortType, setSortType] = useState<string | null>('date');
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  return (
    <div style={styles}>
      <Select
        value={sortType}
        onChange={setSortType}
        data={[
          { value: 'date', label: 'Sort by Date & Time' },
          { value: 'message', label: 'Sort by Message' },
        ]}
        style={{ maxWidth: 250 }}
      />
      <Button
        variant={isSortedAsc ? 'filled' : 'outline'}
        onClick={() => setIsSortedAsc(true)}
      >
        Asc
      </Button>
      <Button
        variant={isSortedAsc ? 'outline' : 'filled'}
        onClick={() => setIsSortedAsc(false)}
      >
        Desc
      </Button>
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
