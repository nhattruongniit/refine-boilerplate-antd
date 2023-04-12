import { SearchOutlined } from '@ant-design/icons';
import { Typography, Input, InputRef } from 'antd';
import React from 'react';

const { Text } = Typography;

export const InputApplicationSearch = () => {
  const inputRef = React.useRef<InputRef>(null);
  const [isShowInput, setInput] = React.useState(false);
  const sharedProps = {
    style: { width: '100%' },
    defaultValue: 'Tony love you!',
    ref: inputRef,
  };

  React.useEffect(() => {
    if (!isShowInput) return;
    inputRef.current!.focus({
      cursor: 'start',
    });
  }, [isShowInput]);

  return (
    <div className="h-[55px] bg-[#FAFAFA] dark:bg-[#1F2937] flex items-center px-4  border-0 border-b border-[#0000000f] dark:border-[#111a2c] border-solid">
      <div className="flex justify-between w-full">
        {isShowInput ? <Input placeholder="Basic usage" {...sharedProps} /> : <Text className="">Application</Text>}
        <SearchOutlined
          className="cursor-pointer ml-4"
          onClick={() => {
            setInput(!isShowInput);
          }}
        />
      </div>
    </div>
  );
};
