import Products from '~/components/pages/PageProducts/components/Products';
import Box from '@mui/material/Box';
import { useAlert } from '~/context/alertContext';

export default function PageProducts() {
  const alertCtx = useAlert();
  alertCtx.clearAlert();
  return (
    <Box py={3}>
      <Products />
    </Box>
  );
}
