import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';

function SettingButton(props) {
  return (
    <IconButton className="w-40 h-40">
      <FuseSvgIcon className="text-gray-50">heroicons-outline:globe-alt</FuseSvgIcon>
    </IconButton>
  );
}

export default SettingButton;
