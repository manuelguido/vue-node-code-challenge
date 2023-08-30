import axios, { AxiosError, AxiosResponse } from 'axios';
import store from '@/store';
import router from '@/router';
import { mapGetters } from 'vuex';

const apiMixin = {
  computed: {
    ...mapGetters({
      token: 'auth/token'
    }),
  },

  mounted() {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:8000/';
    // axios.defaults.headers.common['Accept'] = "application/json"
    axios.defaults.headers.common['Authorization'] = `${this.token}`;
  },

  methods: {
    async $httpGet<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
      try {
        const response: AxiosResponse<T> = await axios.get(url, { params });
        return response;
      } catch (error: any) {
        this.handleAxiosError(error);
        throw error;
      }
    },

    async $httpPost<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
      try {
        const response: AxiosResponse<T> = await axios.post(url, data);
        return response;
      } catch (error: any) {
        this.handleAxiosError(error);
        throw error;
      }
    },

    async $httpPatch<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
      try {
        const response: AxiosResponse<T> = await axios.patch(url, data);
        return response;
      } catch (error: any) {
        this.handleAxiosError(error);
        throw error;
      }
    },

    async $httpDelete<T>(url: string): Promise<AxiosResponse<T>> {
      try {
        const response: AxiosResponse<T> = await axios.delete(url);
        return response;
      } catch (error: any) {
        this.handleAxiosError(error);
        throw error;
      }
    },

    // Common error handling method
    handleAxiosError(error: AxiosError) {
      if (error.response && error.response.status === 401) {
        store.dispatch("auth/logout");
        router.push("/login");
      }
    },
  },
}

export default apiMixin
