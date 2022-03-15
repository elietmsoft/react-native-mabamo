import http from "./apiConfig";

const source="/wp-json/wc/v3/products/reviews";

class Reviews{

    get(){
        return http.get(source);
    }

    show(id){
        return http.get(`${source}/${id}`);
    }

}
export default new Reviews();
