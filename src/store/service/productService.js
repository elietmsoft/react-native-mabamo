import http from "./apiConfig";

const source="/wp-json/wc/v3/products";

class Produts{

    getAll(){
        return http.get(source);
    }

    show(id){
        return http.get(`${source}/${id}`);
    }

    getByKey(query){
        return http.get(`${source}?${query}`);
    }

    getVariations(id){
        return http.get(`${source}/${id}/variations`);
    }
    showVariation(id_product,id){
        return http.get(`${source}/${id_product}/variations/${id}`);
    }

}
export default new Produts();
