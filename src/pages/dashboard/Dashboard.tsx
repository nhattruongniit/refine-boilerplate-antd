import React from 'react';
import { CopyOutlined, PushpinTwoTone, SettingOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

// components
import { ImageWithIconStore, DotStatus } from 'components';
import { InputApplicationSearch } from './components/InputApplicationSearch';
import InstanceList from './components/InstanceList';

const { Text, Link } = Typography;

export const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <div
        className="w-[400px] shrink-0 dark:text-white border-0 border-r border-[#0000000f] dark:border-[#111a2c] border-solid"
        style={{
          minHeight: 'calc(100vh - 65px)',
        }}
      >
        {/* input search application */}
        <InputApplicationSearch />

        {/* list application */}
        {new Array(20).fill(0).map((_, index) => {
          return (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between p-4 border-0 border-b border-[#0000000f] dark:border-[#111a2c] border-solid">
                <div className="flex items-center">
                  <div className="w-[48px]">
                    <ImageWithIconStore />
                  </div>
                  <div className="mr-2 ml-4">
                    <Text>Baby Shark - Word Run</Text>
                    <Text className="ant-primary-color text-[0.7rem] block">com.innovation.magictilessaga</Text>
                  </div>
                </div>
                <div className="flex items-center">
                  <DotStatus value="Approved" />
                  <span className={`ml-4 transition duration-50 group-hover:opacity-100 cursor-pointer`}>
                    <PushpinTwoTone className="text-xl" />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="w-full">
        <div className="h-[55px] bg-[#FAFAFA] dark:bg-[#1F2937] flex items-center px-4">
          <div className="flex justify-between w-full">
            <Text className="">Application details</Text>
          </div>

          <Button>View guidelines</Button>
        </div>

        <div className="flex flex-wrap justify-between items-center bg-[#E6F7FF] dark:bg-[#111a2c] p-3 md:flex-nowrap">
          <div className="flex items-center w-full">
            <div className="w-[64px] shrink-0">
              <ImageWithIconStore />
            </div>
            <div className="mr-2 ml-4">
              <Text>Baby Shark - Word Run</Text> <br />
              <Link href="https://ant.design" target="_blank" className="text-[12px]">
                Details on IS
              </Link>
              <div className="flex ant-primary-color text-[0.7rem] block">
                <Text className="text-[12px]"> BundleID: 91d25d7d</Text> <br />
                <CopyOutlined className="cursor-pointer text-[15px] text-[#1677ff] ml-2" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-right md:mt-0 w-full">
            <Button>Export template</Button>
            <Button type="primary" className="ml-4 mt-2">
              Import instance
            </Button>
          </div>
        </div>

        <div className="flex justify-end  items-center text-right my-10 px-4">
          <Button>Sync</Button>
          <Button className="mx-4">Retry</Button>
          <div>
            <SettingOutlined className="text-[25px] cursor-pointer" />
          </div>
        </div>

        {/* instance list */}
        <div className="px-4">
          <InstanceList />
        </div>
      </div>
    </div>
  );
};
