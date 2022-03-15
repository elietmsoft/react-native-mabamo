import { isEmpty } from "lodash";
import http from "./apiConfig";

const source="/wp-json/wc/v3/products/categories";

class Categories{

    get(){
        return http.get(source);
    }

    show(id){
        return http.get(`${source}/${id}`);
    }

    getByKey(query){
        return http.get(`${source}?${query}`);
    }

}
export default new Categories();
