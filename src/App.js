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

//AppSync 連携設定
Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USERPOOLID,
    userPoolWebClientId: process.env.REACT_APP_USERPOOLWEBCLIENTID
  },
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC,
  aws_appsync_region: process.env.REACT_APP_REGION,
  aws_appsync_apiKey: "null"
})


  //state初期化
  const [message, setMessage] = useState("");
  const [gamedata, setGamedata] = useState();
  
  //メッセージ取得クエリー
  //queryGamedataByid リゾルバを呼び出します。引数として id を渡します。
  //レスポンスに欲しいアイテムを、items 以下に記述します。
  const queryGetGame = gql`
    query queryGamedataByid($id: String!) {
      queryGamedataByid(id: "") {
        items {
          id
          timestamp
          winner
          first
          mydeck
          oppdeck
          memo
        }
      }
    }
  `;
  //対戦データ取得関数
  //上に定義したクエリーを AWS AppSync に投げます。
  const getGame = async () => {
    const res = await client.graphql({
      query: queryGetGame,
      variables: {
        id: id
      }
    });
    
       //レスポンスを res 定数で受け取ると、以下に表現した階層構造でデータを受け取れます。
    setGamedata(res.data.queryGamedataByid.items);
  };
    
      //対戦データ登録クエリー
  //queryPutChat リゾルバを呼び出します。引数として、DynamoDB テーブルの項目を渡します。
  //ここで重要なのが、id を最後にポツンと定義しているところです。ここは、Subscription と合わせる必要があります。
  const queryPutGame = gql`
    mutation putGamedata(
      $id: String!,
      $timestamp: String!,
      $winner: String!,
      $first: String!,
      $mydeck: String!,
      $oppdeck: String!,
      $memo: String
    ) {
      putGamedata(input: {
        id: $id,
        timestamp: $timestamp,
        winner: $winner,
        first: $first,
        mydeck: $String!,
        oppdeck: $String!,
        memo: $String
      }) {
        id
      }
    }
  `;
  

      //対戦データ登録関数
  //上に定義したクエリーを AWS AppSync に投げます。
  const putGame = async () => {
    await client.graphql({
      query: queryPutGame,
      variables: {
        id: id,
        timestamp: timestamp,
        winner: winner,
        first: first,
        mydeck: mydeck,
        oppdeck: oppdeck,
        memo: memo
      },
    });
    //メッセージ入力欄クリア
    setMessage("");
  };


  //コンポーネント表示時に実行
  useEffect(() => {
    //メッセージ取得　画面表示時点のメッセージデータを取得します。
    getGame();
    //サブスクリプション実行　これにより、DynamoDB テーブルへのデータ書込のプッシュ通知を受けられる状態にします。
    subscribePutGame();
  }, []);


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
        
        <FormControl>
             <FormLabel id="winner">勝敗</FormLabel>
             onChange={e => setGameData({ ...formData, 'id': e.target.value})}
              <RadioGroup
               aria-labelledby="id"
               defaultValue="pokeca"
               name="id"
              >
             <FormControlLabel value="pokeca" control={<Radio />} label="ポケモンカードゲーム" />
           </RadioGroup>
           </FormControl>
        
        <TextField
        onChange={e => setGameData({ ...formData, 'timestamp': e.target.value})}
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
             <FormLabel id="winner">勝敗</FormLabel>
             onChange={e => setGameData({ ...formData, 'winner': e.target.value})}
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
            <FormLabel id="first">先後</FormLabel>
            onChange={e => setGameData({ ...formData, 'first': e.target.value})}
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
            onChange={e => setGameData({ ...formData, 'mydeck': e.target.value})}
            margin="normal"
            required
            fullWidth
            label="使用デッキ"
            id="mydeck"
            name="mydeck"
          />

          <TextField
            onChange={e => setGameData({ ...formData, 'oppdeck': e.target.value})}
            margin="normal"
            required
            fullWidth
            label="相手のデッキ"
            id="oppdeck"
            name="oppdeck"
          />
          
         <TextField
            onChange={e => setGameData({ ...formData, 'memo': e.target.value})}
            margin="normal"
            fullWidth
            label="メモ"
            id="memo"
            name="memo"
          />
          <Button
          onClick={() => putGame()}
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
          {gamedata?.map((row) => (
            <React.Fragment>
              <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                <Typography variant="caption" component="span" color="text.secondary">{format(Date.parse(row.timestamp),"yyyy-MM-dd")}</Typography>
              </Stack>
              <Typography variant="caption" component="div" sx={{mb:1}} style={{whiteSpace:"pre-line"}}>{row.mydeck}</Typography>
               <Typography variant="caption" component="div" sx={{mb:1}} style={{whiteSpace:"pre-line"}}>{row.oppdeck}</Typography>
                <Typography variant="caption" component="div" sx={{mb:1}} style={{whiteSpace:"pre-line"}}>{row.first}</Typography>
                 <Typography variant="caption" component="div" sx={{mb:1}} style={{whiteSpace:"pre-line"}}>{row.winner}</Typography>
                  <Typography variant="caption" component="div" sx={{mb:1}} style={{whiteSpace:"pre-line"}}>{row.memo}</Typography>
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