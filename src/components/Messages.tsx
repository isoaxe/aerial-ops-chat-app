import { ScrollArea } from '@mantine/core';
import { trpc } from '~/utils/trpc';

export default function Messages() {
  const msgs = trpc.getMsgs.useQuery().data;

  function formatTimestamp(unixTimestamp: number) {
    const dateString = new Date(unixTimestamp).toString();
    const date = dateString.slice(0, 10);
    const time = dateString.slice(16, 21);
    return `${date} - ${time}`;
  }

  return (
    <ScrollArea h={400}>
      {msgs?.map((msg) => {
        return (
          <div style={msgWrapStyle}>
            <div style={msgStyle} key={msg._id}>
              {msg.text}
            </div>
            <div style={timestampStyle}>{formatTimestamp(msg.unixTime)}</div>
          </div>
        );
      })}
    </ScrollArea>
  );
}

const msgWrapStyle = {
  margin: '5px 20px 10px 10px',
};

const msgStyle = {
  width: 'fit-content',
  padding: '8px',
  border: '1px solid #9bc5d6',
  borderRadius: '5px',
  backgroundColor: '#fff',
};

const timestampStyle = {
  fontSize: '10px',
  paddingLeft: '5px',
};
