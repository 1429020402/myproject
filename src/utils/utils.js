function getnum(a){
    return a<10?'0'+a:a
}

export function mytime(num){
    var now=new Date(num)
    return now.getFullYear()+'-'+getnum(now.getMonth()+1)+'-'+getnum(now.getDate())+' '+getnum(now.getHours())+':'+getnum(now.getMinutes())+':'+getnum(now.getSeconds())
}