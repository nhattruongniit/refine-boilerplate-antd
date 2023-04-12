import { ExtraStatus } from 'types/enum';

const DotStatus: React.FC<{
  value: string;
  size?: 'Medium' | 'Large';
}> = ({ value, size }) => {
  let color;
  switch (value) {
    case ExtraStatus.PendingApproval:
    case ExtraStatus.Attention:
      color = 'bg-orange-400';
      break;
    case ExtraStatus.Pending:
      color = 'bg-yellow-400';
      break;
    case ExtraStatus.Initial:
    case ExtraStatus.NotInUse:
    case ExtraStatus.CoolingDown:
    case ExtraStatus.Inactive:
      color = 'bg-gray-400';
      break;
    case ExtraStatus.Uploading:
      color = 'bg-blue-400';
      break;
    case ExtraStatus.Syncing:
      color = 'bg-blue-400';
      break;
    case ExtraStatus.Unapproved:
    case ExtraStatus.Assigning:
    case ExtraStatus.Failed:
    case ExtraStatus.Unavailable:
    case ExtraStatus.Rejected:
    case ExtraStatus.Archived:
    case 'PAUSED':
      color = 'bg-red-400';
      break;
    // case ExtraStatus.Active:
    //   color = 'bg-green-400';
    //   break;
    default:
      color = 'bg-green-400';
      break;
  }

  let renderDots = <div className={`${color} min-w-[8px] min-h-2y  w-2 h-2 rounded-[50%]`} />;
  if (size === 'Medium') {
    renderDots = <div className={`${color} w-[6px] h-[6px] rounded-[50%] mr-2`} />;
  }
  return renderDots;
};

export default DotStatus;
