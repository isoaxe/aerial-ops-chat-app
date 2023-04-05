import { useState, CSSProperties } from 'react';
import { ObjectId } from 'mongodb';
import { ScrollArea } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { trpc } from '~/utils/trpc';
import { MessagesProps } from '~/utils/types';

export default function Messages(props: MessagesProps) {
  const [msgId, setMsgId] = useState<ObjectId | null>(null); // track which msg is being hovered

  const { msgs, refetch } = props;

  const mutation = trpc.deleteMsg.useMutation({ onSettled: refetch });

  function deleteMsg(timeStamp: number) {
    mutation.mutate({ timeStamp });
  }

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
          <div style={msgWrapStyle} key={msg._id.toString()}>
            {msg.imageUrl ? (
              <img style={imageStyle} src={msg.imageUrl} />
            ) : null}
            <div
              style={msgIconStyle}
              onMouseEnter={() => setMsgId(msg._id)}
              onMouseLeave={() => setMsgId(null)}
            >
              <div style={msgStyle}>{msg.text}</div>
              <IconTrash
                style={trashIcon}
                onClick={() => deleteMsg(msg.unixTime)}
                visibility={msgId === msg._id ? 'visible' : 'hidden'}
                onMouseOver={(e) => (e.currentTarget.style.cursor = 'pointer')}
              />
            </div>
            <div style={timestampStyle}>{formatTimestamp(msg.unixTime)}</div>
          </div>
        );
      })}
    </ScrollArea>
  );
}

const msgWrapStyle: CSSProperties = {
  margin: '5px 20px 10px 10px',
};

const imageStyle: CSSProperties = {
  maxWidth: '200px',
  maxHeight: '300px',
};

const msgIconStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const msgStyle: CSSProperties = {
  width: 'fit-content',
  padding: '8px',
  border: '1px solid #9bc5d6',
  borderRadius: '5px',
  backgroundColor: '#fff',
};

const timestampStyle: CSSProperties = {
  fontSize: '10px',
  paddingLeft: '5px',
};

const trashIcon: CSSProperties = {
  color: '#9da2a4',
};
