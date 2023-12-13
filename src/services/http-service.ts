import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }
    getAll<T>() {
        const controller = new AbortController();

        const request =  apiClient.get<T[]>(this.endpoint, { 
            signal: controller.signal
        });
        return { request, cancel: () => controller.abort()}
    }

    delete(id: number) {
        return  apiClient.delete(this.endpoint + '/' + id)
    }

    create<T>(entity: T) {
        return apiClient.post(this.endpoint, user);
    }

    updateUser<T extends Entity>(entity: T) {
        return apiClient.patch(this.endpoint + '/' + user.id, user);
    }
}

const create = (endpoint: strig) => new HttpService(endpoint);

export default create; 