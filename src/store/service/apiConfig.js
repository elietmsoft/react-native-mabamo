import axios from "axios";
import config from "../../config/config";
//const  basicAuth = 'Basic ' + (config.CLIENT_ID + ':' + config.PASSWORD);
import {decode,encode} from 'base-64';

if(!global.btoa){
    global.btoa=encode;
}
if(!global.atob){
    global.atob=decode;
}

export default axios.create({
    baseURL:config.URL_TEST,
    auth:{
        password:config.PASSWORD_TEST,
        username:config.CLIENT_ID_TEST
    },headers:{
        'Accept':'application/json',
        'Content-Type':"application/json"
    }
})