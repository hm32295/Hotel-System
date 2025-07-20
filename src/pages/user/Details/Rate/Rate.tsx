import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { Check, FormatBold, FormatItalic, KeyboardArrowDown } from '@mui/icons-material';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Textarea from '@mui/joy/Textarea';
import { useForm } from 'react-hook-form';
import { axiosInstance, ROOM_REVIEW_URL } from '../../../../services/Url';
import Progress from '../Progress';
import { toast } from 'react-toastify';

const labels: { [index: number]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export default function Rate({ id }: { id: string }) {
  const { register, formState: { errors }, reset, handleSubmit } = useForm();
  const [value, setValue] = useState<number | null>(2);
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loader, setLoader] = useState(false);

  const setRating = async (data: any) => {
    data = { ...data, rating: value, roomId: id };
    setLoader(true);
    try {
      await axiosInstance.post(ROOM_REVIEW_URL.CREATE, data);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',    
        minWidth: 0     
      }}
    >
     
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <Typography>Rate</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
        />
        <Typography sx={{ ml: 2 }}>{labels[value ?? 0]}</Typography>
      </Box>

    
      <FormControl component="form" onSubmit={handleSubmit(setRating)} sx={{ width: '100%' }}>
        <FormLabel>Message</FormLabel>
        <Textarea
          placeholder=""
          minRows={3}
          {...register('review', { required: 'required' })}
          endDecorator={
            <Box
              sx={{
                display: 'flex',
                gap: 'var(--Textarea-paddingBlock)',
                pt: 'var(--Textarea-paddingBlock)',
                borderTop: '1px solid',
                borderColor: 'divider',
                flex: 'auto'
              }}
            >
              <IconButton
                variant="plain"
                color="neutral"
                onClick={e => setAnchorEl(e.currentTarget)}
              >
                <FormatBold />
                <KeyboardArrowDown fontSize="md" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                size="sm"
                placement="bottom-start"
                sx={{ '--ListItemDecorator-size': '24px' }}
              >
                {['200', 'normal', 'bold'].map(weight => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => { setFontWeight(weight); setAnchorEl(null); }}
                    sx={{ fontWeight: weight }}
                  >
                    <ListItemDecorator>
                      {fontWeight === weight && <Check fontSize="sm" />}
                    </ListItemDecorator>
                    {weight === '200' ? 'lighter' : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? 'soft' : 'plain'}
                color={italic ? 'primary' : 'neutral'}
                aria-pressed={italic}
                onClick={() => setItalic(b => !b)}
              >
                <FormatItalic />
              </IconButton>
              <Button
                type="submit"
                disabled={loader}
                sx={{ background: loader ? '#fff' : 'rgba(21, 44, 91, 1)', color: '#fff', ml: 'auto' }}
              >
                {loader ? <Progress /> : 'Send Message'}
              </Button>
            </Box>
          }
          sx={[
            { width: '100%', fontWeight },
            italic ? { fontStyle: 'italic' } : { fontStyle: 'initial' }
          ]}
        />
        {errors.review && (
          <Typography sx={{ color: 'red', textTransform: 'capitalize' }}>
            {errors.review.message}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
}
