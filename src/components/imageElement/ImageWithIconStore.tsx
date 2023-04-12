import { AppleFilled } from '@ant-design/icons';

export const ImageWithIconStore: React.FC = () => {
  return (
    <div className="relative">
      <img
        className="w-full h-full object-cover mr-2 rounded-md"
        src="https://platform.ssacdn.com/demand-creatives/icons/icon_e339842a8f755a7d93d9b1daf1c33bc3_66125.jpeg"
        alt=""
      />
      <div className="absolute top-[-15px] right-[-9px] text-[20px] text-black opacity-[0.4]">
        <AppleFilled />
      </div>
    </div>
  );
};
