import React, { useState } from 'react';
import { Button, Input, InputRef, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ColumnType, FilterConfirmProps, FilterValue } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  tag: string;
}

type DataIndex = keyof DataType;

const InstanceList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [, setSearchText] = useState('');
  const [, setSearchedColumn] = useState('');
  const [filteredInfo] = useState<Record<string, FilterValue | null>>({});
  const searchInput = React.useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Instance ID',
      dataIndex: 'key',
      ...getColumnSearchProps('key'),
    },
    {
      title: 'Instance name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Network name',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name.includes(value),
      ellipsis: true,
    },
    {
      title: 'Ad unit',
      dataIndex: 'address',
      render: (_, { tag }) => <>{<Tag color="geekblue">{tag.toUpperCase()}</Tag>}</>,
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name.includes(value),
      ellipsis: true,
    },
    {
      title: 'Mediation group',
      dataIndex: 'address',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name.includes(value),
      ellipsis: true,
    },
    {
      title: 'Rate',
      dataIndex: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name.includes(value),
      ellipsis: true,
    },
    {
      title: 'Operator',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King  `,
      age: 32,
      address: `London, Park Lane no. ${i}`,
      tag: 'Intersitial',
    });
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="">
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default InstanceList;
