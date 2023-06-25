  
import './Style.css';
import localStorage from 'local-storage';

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import { useNavigate } from 'react-router-dom';
import ButtonLoggout from '../../components/ButtonLoggout';
import foto from './foto'
import Content from './Content';
import useAuth from '../../hooks/useAuth';


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YWpvenZmYXJxcGVrbnhwcW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NDAxNjksImV4cCI6MjAwMDQxNjE2OX0.1S4_cSS2chgNR7MtTPNhAR5NEgsDS_-Z3Ht86brKJQo';
const SUPABASE_URL = 'https://pxajozvfarqpeknxpqmt.supabase.co';
const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

function Home({user}) {
  //Função para deslogar
  const {signout} = useAuth();
  const navigate = useNavigate();
  // hook para lidar com a mensagem do usuário
  const [mensagem, setMensagem] = useState('');
  const [buttonVisible, setButtonVisible] = useState("button-logout_hidden");
  const [idChat, setIdChat] = useState(-1);
  

  useEffect(() => {
    console.log(user)
  })
 
  // função para mandar a mensagem para o banco 
  async function handleNovaMensagem(novaMensagem) {
    
    console.log(novaMensagem);

    novaMensagem = "{"+novaMensagem+"}";
    const mensagem = {
        //id: 1,
        questao: novaMensagem,
        resposta: "{ }",
        usuario: user.id
    };

    const { error } = await supabaseClient
    .from('chat')
    .insert(mensagem)
    
    if(error == null) { 
      console.log("Enviado");
    }else {
      console.log(error);
    }
   
    setMensagem('');
  }

  console.log(user.foto_url);

  return (
    <body>
      <div className="main-page">
        
        <div className="nav">
          <nav>
            <button className="new-chat-button"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New Chat</button>
            <div className={buttonVisible}>
              <ButtonLoggout Text="Loggout" onClick={() => [signout(), navigate("/")]}>Loggout</ButtonLoggout>
            </div>
            <div className="area-account" onClick={() => {
                console.log("alo" + buttonVisible);
                if(buttonVisible === "button-logout_hidden") {
                  setButtonVisible("button-logout_visible");
                }else{
                  setButtonVisible("button-logout_hidden");
                }
              }}>
              <button className="account-button" >
              
                <div className="account-settings">
                  
                  <img src={user.foto_url}/>
                  <div className='account-username'>{user.nome}</div>
                  <svg stroke="white" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 flex-shrink-0 text-gray-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </div>
              </button>
            </div>
          </nav>
        </div>

        <div className="main-content">

          <Content props={0}></Content>


          <div className='text-div'>
            <div className='text-box'>
              <form>
                <textarea  value={mensagem} 
                  onChange={(event) => {
                    const valor = event.target.value;
                    setMensagem(valor);
                    console.log(valor);
                  }}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter' && event.shiftKey === false) {
                        event.preventDefault();
                        handleNovaMensagem(mensagem);
                    }
                  }}
                  className='text-area'
                  placeholder="Ask a Question" name='Mensagem' id="user-messagr"></textarea>
              </form>
              <div className="send-button">
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </div>
              </div>
              <span className='span_bottom'>
                  Free Research Preview. ChatGPT may produce inaccurate
                  information about people, places, or facts. ChatGPT Mar 23
                  Version
                </span>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Home;