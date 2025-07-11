
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function Skeleton_Loader() {
  return (
    <Stack spacing={1} sx={{m: 2}}>
      <Skeleton  variant="text" sx={{width:'100%',height:'5rem'}} />

     
      <Skeleton  variant="rectangular" sx={{width:'100%',height:'5rem'}}/>
      <Skeleton  variant="rounded" sx={{width:'100%',height:'5rem'}}/>
    </Stack>
  );
}