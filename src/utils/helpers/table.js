export function getPaginationCount(list=[]){
    let response=0;
    const count=list.length/10;
    response=Math.trunc(count);
    if(response%10!=0)response++;
    return response;
}

export function getListByPage(list=[],page=1,count=10){
    let response=[];
    response=list.slice(0+(page-1)*count,(page-1)+count);
    return response;
}