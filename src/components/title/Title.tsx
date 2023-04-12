import { Typography } from 'antd';

const { Title } = Typography;

export default function TitleComponent() {
  return (
    <div className="flex items-center">
      <img src="/images/favicon.png" alt="Amanotes" className="w-[35px]" />
      <Title level={4} className="mb-0 ml-4">
        MMS
      </Title>
    </div>
  );
}
