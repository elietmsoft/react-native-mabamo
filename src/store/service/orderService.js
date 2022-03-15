import http from "./apiConfig";

const source="/wp-json/wc/v3/products/reviews";

class Orders{

    get(){
        return http.get(source);
    }

    getByQuery(query=""){
        return http.get(`${source}/${query}`);
    }

    show(id){
        return http.get(`${source}/${id}`);
    }

}
export default new Orders();
