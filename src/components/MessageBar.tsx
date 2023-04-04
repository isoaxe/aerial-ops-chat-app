import { useState, CSSProperties } from 'react';
import { Textarea, Button } from '@mantine/core';
import { IconPaperclip } from '@tabler/icons-react';
import { trpc } from '~/utils/trpc';
import { S3_BUCKET_NAME } from '~/utils/constants';

export default function MessageBar() {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState('');
  const [fileType, setFileType] = useState('');

  const mutation = trpc.addMsg.useMutation();
  const preSignedUrl = trpc.getPresignedUrl.useQuery(
    { filename, fileType },
    { enabled: !!filename && !!fileType },
  ).data;

  function addMsg() {
    mutation.mutate({ text });
    if (preSignedUrl) uploadPhotoToS3();
    setText('');
    setFilename('');
    setFileType('');
  }

  function attachPhoto() {
    const input = document.getElementById('upload') as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      const { name, type } = file;
      setFilename(name);
      setFileType(type);
    }
  }

  async function uploadPhotoToS3() {
    if (!preSignedUrl) return;
    const upload = await fetch(preSignedUrl, {
      method: 'PUT',
      body: filename,
      headers: { 'Content-Type': fileType },
    });
    if (upload.ok) console.log('Photo uploaded successfully!');
    else console.error('Photo upload failed.');
    return `https://${S3_BUCKET_NAME}.s3.us-east-1s.amazonaws.com/${filename}`;
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
      <input
        id='upload'
        type='file'
        accept='image/*'
        onChange={attachPhoto}
        hidden
      />
      <Button
        onClick={() => document.getElementById('upload')?.click()}
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
