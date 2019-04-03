import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data,method='GET') {
    //请求方式改为大写
   method=method.toUpperCase();
   let prmosie=null;
   if(method==='GET'){
    prmosie= axios.get(url,{params:data})

   }else {
     prmosie=axios.post(url,data)
   }
   return prmosie
       .then(res=>{
          return res.data
       })
       .catch(err=>{
          console.log(err)
           message.error('网络故障')

       })
}