/* App.js */
import * as React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Select,
} from "@mui/material";
import {
  Option,
} from "@mui/base";

import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import PropTypes from 'prop-types';
import { Select as BaseSelect, selectClasses } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { Popper as BasePopper } from '@mui/base/Popper';

const App = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={2}>
      <Grid item xs={3} md={6} lg={6}>
        <Typography component="h1" variant="h4">
          登録フォーム
        </Typography>
         
         <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
        
        <Box component="form" noValidate sx={{ mt:1 }}>
        <TextField
        fullWidth
        required
        label="日付"
        type="date"
        id="timestamp"
        name="timestamp"
        InputLabelProps={{
          shrink: true
        }}
         />
        
         <Grid container spacing={2}>
           <Grid item xs={6}>
            <FormControl>
             <FormLabel id="demo-radio-buttons-group-label">勝敗</FormLabel>
              <RadioGroup
               aria-labelledby="winner"
               defaultValue="win"
               name="winner"
              >
             <FormControlLabel value="win" control={<Radio />} label="勝ち" />
             <FormControlLabel value="lose" control={<Radio />} label="負け" />
           </RadioGroup>
           </FormControl>
          </Grid>
      
           <Grid item xs={6}>
           <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">先後</FormLabel>
             <RadioGroup
              aria-labelledby="first"
              defaultValue="first"
              name="first"
             >
            <FormControlLabel value="first" control={<Radio />} label="先攻" />
            <FormControlLabel value="last" control={<Radio />} label="後攻" />
           </RadioGroup>
           </FormControl>
          </Grid>
         </Grid>

          <TextField
            margin="normal"
            required
            fullWidth
            label="使用デッキ"
            id="mydeck"
            name="mydeck"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="相手のデッキ"
            id="oppdeck"
            name="oppdeck"
          />
          
         <TextField
            margin="normal"
            fullWidth
            label="メモ"
            id="memo"
            name="memo"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt:3, mb:2 }}
          >
            登録
          </Button>
          </Box>
         </Paper>
        </Grid>
     <Grid item xs={3} md={6} lg={6}>
     <Typography component="h1" variant="h4">
          対戦履歴
        </Typography>
     </Grid> 
     </Grid>
    </Container>
  );
};

export default App;