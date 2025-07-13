import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { axiosInstance, ROOM_COMMENT_URL } from '../../../../services/Url';

export default function Comment({id}) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {register,formState:{errors}, reset,handleSubmit} = useForm()

  const setComment =async (data)=>{
   
    data = {...data, roomId:id}
    console.log(data);
    
    
    try {
        const response = await axiosInstance.post(ROOM_COMMENT_URL.CREATE,data)
        console.log(response);
        reset()
    } catch (error) {
      console.log(error);
      
    }
    
  }
  return (
    <FormControl component={'form'} onSubmit={handleSubmit(setComment)} sx={{overflow:'hidden'}} >
      <FormLabel sx={{marginBottom:'2rem'}}>Your comment</FormLabel>
      <Textarea
        placeholder=""
        minRows={3}
        {...register('comment',{required:'required'})}
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

            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
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
              {['200', 'normal', 'bold'].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
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
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
           <Button type='submit' sx={{background:'#3252DF',color:'#fff', padding:'.6rem .9rem',textTransform:'uppercase', ml: 'auto'}}>Send</Button>
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
      {errors.comment&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.comment?.message}</Typography>}
    </FormControl>
  );

}