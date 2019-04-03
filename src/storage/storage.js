/*
localStorage 处理
*/

const USER_KEY='user';
//保存用户信息
export function setItem(value) {
   if(!value ||typeof value==='function'){
       return ;
   }
   localStorage.setItem(USER_KEY,JSON.stringify(value))

}
export function getItem() {
    const user=localStorage.getItem(USER_KEY);
    if(!user){
        return '';
    }else {
        return JSON.parse(user)
    }
}
export function removeItem() {
    localStorage.removeItem(USER_KEY);
}