import React from "react";
import * as C from "./styles";

export default function UserImage(props) {
    console.log("userImage", props);
    if(typeof props != "undefined") {
        return(
            <C.UserImage src={props.src}></C.UserImage>
            )
    }else{
        return(
            <svg stroke="white" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        )
    }
}