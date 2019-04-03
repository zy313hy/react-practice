import ajax from './ajax'
import jsonp from 'jsonp'

const prefix=process.env.NODE_ENV==='development' ?  'http://localhost:3000':'http://localhost:5000';
export const reLogin=(username,password)=> ajax(prefix + '/login',{username,password},'POST');

export const reqWeather=(city)=>{
    return  new Promise((resolve, reject)=>{
      jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,(err,data)=>{
          if(!err){
              const{dayPictureUrl,weather}=data.results[0].weather_data[0];
              resolve({weather,weatherImg:dayPictureUrl})
          }else {
              reject('网络出错')
          }
      })
    })
}