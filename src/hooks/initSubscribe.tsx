import useWebsocket, {ReadyState} from 'react-use-websocket'

import {useEffect} from 'react'


export function useInitSubscription(){
    console.log("initial Subscription");

const url = 'wss://stream.data.alpaca.markets/v2/iex';

const {sendJsonMessage, lastJsonMessage, readyState} = useWebsocket(url, {

    share: false,
    shouldReconnect: ()=>true,
})

useEffect(()=>{
   {
        sendJsonMessage({
            "action": "auth", "key": "PKMQH30TFV7J4VZ7XD2J", "secret": "AtoRkjIvkgnmcOZQRe8B7WZGKZdjFgbHF3Ov4gz9"
        })
    }
}, [readyState])

console.log(lastJsonMessage)
    return {lastJsonMessage, readyState}



}