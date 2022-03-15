import http from "./apiConfig";

const source="/wp-json/wc/v3/customers";

class CustomerService{

    getAll(){
        return http.get(source);
    }

    show(id){
        return http.get(`${source}/${id}`);
    }

    update(id,data){
        return http.put(`${source}/${id}`,data);
    }

    store(data){
        return http.post(`${source}`,data);
    }

    getByKey(query){
        return http.get(`${source}?${query}`);
    }

}
export default new CustomerService();
