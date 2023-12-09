/* App.js */
import * as React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Select,
  Stack,
} from "@mui/material";
import {
  Option,
} from "@mui/base";

import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/api";
import gql from 'graphql-tag';
import { format } from 'date-fns';
import { useState, useEffect  } from "react";
import { GraphQLAPIClass } from '@aws-amplify/api-graphql';

import SendIcon from '@mui/icons-material/Send';

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


import awsconfig from './aws-exports';
import { PubSub } from '@aws-amplify/pubsub';
import './App.css';

import { listGames } from './graphql/queries';
import { createGame } from './graphql/mutations';
import { createGame as createGameMutation, deleteGame as deleteGameMutation } from './graphql/mutations';


const GraphQLAPI = new GraphQLAPIClass();


const client = generateClient();

  const initialFormState = { 
          id: '',
          timestamp: '',
          winner: '',
          first: '',
          mydeck: '',
          oppdeck: '',
          memo: '' 
          }

Amplify.configure(awsconfig);
//PubSub.configure(awsconfig);

const App = () => {
       
  //state初期化
  const [inputData, setInputData] = useState([]);
  const [gamedata, setGame] = useState(initialFormState);

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  // async function fetchNotes() {
  //   const apiData = await client.graphql({ query: listGames });
  //   setInputData(apiData.data.listGames.items);
  // }

  async function createGame() {
    if (!gamedata.mydeck || !gamedata.oppdeck) return;
    await client.graphql({ query: createGameMutation, variables: { input: gamedata } });
    setInputData([ ...inputData, gamedata ]);
    setGame(initialFormState);
  }

  // async function componentDidMount() {
  //   try {
  //     const posts = await client.graphql({ query : listGames });
  //     console.log('posts: ', posts)
  //   } catch (e) {
  //     console.log(e)
  //   }

  // client.graphql(graphqlOperation(onCreateGame)).subscribe({
  //   next: (eventData) => {
  //     console.log('eventData: ', eventData)
  //     const post = eventData.value.data.onCreateGame
  //     const posts = [...this.state.posts.filter(content => {
  //       return (content.title !== post.title)
  //     }), post]
  //     this.setState({ posts })

  //   }
  // })

  console.log(gamedata);


  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={2}>
      <Grid item xs={3} md={6} lg={6}>
        <Typography component="h1" variant="h4">
          登録フォーム
        </Typography>
         
         <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
        
        <Box component="form" noValidate sx={{ mt:1 }}>
        
        <FormControl>
             <FormLabel id="winner">カテゴリ</FormLabel>
             
              <RadioGroup
               onChange={(e) => setGame({ ...gamedata, 'id': e.target.value})}
               aria-labelledby="id"
               defaultValue="pokeca"
               value={gamedata.id}
               name="id"
              >
             <FormControlLabel value="pokeca" control={<Radio />} label="ポケモンカードゲーム" />
           </RadioGroup>
           </FormControl>
        
        <TextField
        onChange={(e) => setGame({ ...gamedata, 'timestamp': e.target.value})}
        fullWidth
        required
        label="日付"
        type="date"
        id="timestamp"
        name="timestamp"
        value={gamedata.timestamp}
        InputLabelProps={{
          shrink: true
        }}
         />
        
         <Grid container spacing={2}>
           <Grid item xs={6}>
            <FormControl>
             <FormLabel id="winner">勝敗</FormLabel>
             
              <RadioGroup
               onChange={(e) => setGame({ ...gamedata, 'winner': e.target.value})}
               aria-labelledby="winner"
               value={gamedata.winner}
               name="winner"
              >
             <FormControlLabel value="win" control={<Radio />} label="勝ち" />
             <FormControlLabel value="lose" control={<Radio />} label="負け" />
           </RadioGroup>
           </FormControl>
          </Grid>
      
           <Grid item xs={6}>
           <FormControl>
            <FormLabel id="first">先後</FormLabel>
            
             <RadioGroup
              onChange={(e) => setGame({ ...gamedata, 'first': e.target.value})}
              aria-labelledby="first"
              value={gamedata.first}
              name="first"
             >
            <FormControlLabel value="first" control={<Radio />} label="先攻" />
            <FormControlLabel value="last" control={<Radio />} label="後攻" />
           </RadioGroup>
           </FormControl>
          </Grid>
         </Grid>

          <TextField
            onChange={(e) => setGame({ ...gamedata, 'mydeck': e.target.value})}
            margin="normal"
            required
            fullWidth
            label="使用デッキ"
            id="mydeck"
            value={gamedata.mydeck}
            name="mydeck"
          />

          <TextField
            onChange={(e) => setGame({ ...gamedata, 'oppdeck': e.target.value})}
            margin="normal"
            required
            fullWidth
            label="相手のデッキ"
            id="oppdeck"
            value={gamedata.oppdeck}
            name="oppdeck"
          />
          
         <TextField
            onChange={(e) => setGame({ ...gamedata, 'memo': e.target.value})}
            margin="normal"
            fullWidth
            label="メモ"
            id="memo"
            value={gamedata.memo}
            name="memo"
          />
          <Button
            onClick={createGame}
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
        <Grid container spacing={2}>
        {/* Gamedata */}
        <Grid item xs={12} md={6} lg={12}>
          {
           inputData.map(Game => (
            <React.Fragment key={Game.id || Game.timestamp}>
              <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                <Typography variant="caption" component="span" color="text.secondary">{(Game.timestamp)}</Typography>
              </Stack>
                  <Typography variant="caption" component="div" sx={{mb:1}} >{Game.mydeck}</Typography>
                  <Typography variant="caption" component="div" sx={{mb:1}} >{Game.oppdeck}</Typography>
                  <Typography variant="caption" component="div" sx={{mb:1}} >{Game.first}</Typography>
                  <Typography variant="caption" component="div" sx={{mb:1}} >{Game.winner}</Typography>
                  <Typography variant="caption" component="div" sx={{mb:1}} style={{whiteSpace:"pre-line"}}>{Game.memo}</Typography>
              <Divider sx={{my:1}} />
            </React.Fragment>
          ))}
        </Grid>
     </Grid> 
     </Grid>
      </Grid>
    </Container>
  );
};

export default App;