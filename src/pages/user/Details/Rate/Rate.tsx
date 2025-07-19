import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { Check, FormatBold, FormatItalic, KeyboardArrowDown } from '@mui/icons-material';
import { Button, FormControl, FormLabel, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Textarea from '@mui/joy/Textarea';
import { useForm, SubmitHandler } from 'react-hook-form';
import { axiosInstance, ROOM_REVIEW_URL } from '../../../../services/Url';
import Progress from '../Progress';
import { toast } from 'react-toastify';

// نوع الفورم
interface ReviewFormInputs {
  review: string;
}

interface RateProps {
  id: string; // أو number لو الرقم بيجي كرقم
}

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

export default function Rate({ id }: RateProps) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ReviewFormInputs>();
  const [value, setValue] = useState<number | null>(2);
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState<'200' | 'normal' | 'bold'>('normal');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loader, setLoader] = useState(false);

  const setRating: SubmitHandler<ReviewFormInputs> = async (data) => {
    const payload = { ...data, rating: value, roomId: id };
    setLoader(true);
    try {
      const response = await axiosInstance.post(ROOM_REVIEW_URL.CREATE, payload);
      toast.success(response.data?.data?.message || 'Review created successfully');
      reset();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data?.message || 'User has already added a review for this room');
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.5rem',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: '.5rem' }}>
        <Box>Rate</Box>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        />
        <Box sx={{ ml: 2 }}>{value && labels[value]}</Box>
      </Box>

      <FormControl component="form" onSubmit={handleSubmit(setRating)}>
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
                flex: 'auto',
              }}
            >
              <IconButton variant="plain" color="neutral" onClick={(event) => setAnchorEl(event.currentTarget)}>
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
                {['200', 'normal', 'bold'].map((weight) => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => {
                      setFontWeight(weight as '200' | 'normal' | 'bold');
                      setAnchorEl(null);
                    }}
                    sx={{ fontWeight: weight }}
                  >
                    <ListItemDecorator>{fontWeight === weight && <Check fontSize="sm" />}</ListItemDecorator>
                    {weight === '200' ? 'lighter' : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? 'soft' : 'plain'}
                color={italic ? 'primary' : 'neutral'}
                aria-pressed={italic}
                onClick={() => setItalic((prev) => !prev)}
              >
                <FormatItalic />
              </IconButton>
              <Button type="submit" disabled={loader} sx={{ background: loader ? '#fff' : '#3252DF', color: '#fff', ml: 'auto' }}>
                {loader ? <Progress /> : 'Send'}
              </Button>
            </Box>
          }
          sx={[
            {
              minWidth: 300,
              fontWeight,
            },
            italic ? { fontStyle: 'italic' } : { fontStyle: 'initial' },
          ]}
        />
      </FormControl>
      {errors.review && (
        <Typography sx={{ color: 'red', textTransform: 'capitalize' }}>{errors.review.message}</Typography>
      )}
    </Box>
  );
}
