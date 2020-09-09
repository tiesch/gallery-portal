import axios from "axios";
import { Token, Pictures, PictureDetails } from "@/interfaces/Gallery";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
} from "@/helper/localStorage";
import * as rax from "retry-axios";

export class ApiService {
  private baseURL: string = process.env.VUE_APP_API_BASE_URL || "";
  private apiKey: string = process.env.VUE_APP_API_KEY || "";
  private axiosInstance = axios.create();

  constructor() {
    if (!this.baseURL || !this.apiKey) {
      throw new Error("Missing API configuration");
    }

    this.getToken();

    this.axiosInstance.defaults.raxConfig = {
      instance: this.axiosInstance
    };

    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
          return this.renewToken().then(newToken => {
            error.config.headers["Authorization"] = newToken.token;
            return this.axiosInstance.request(error.config);
          });
        }

        return Promise.reject(error);
      }
    );
  }

  public async getPage(page: number, limit = 9): Promise<Pictures> {
    const token: Token = await this.getToken();
    rax.attach(this.axiosInstance);

    return await this.axiosInstance
      .get(`${this.baseURL}/images?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: token ? token.token : ""
        }
      })
      .then(response => {
        return response.data;
      });
  }

  public async getDetails(id: string): Promise<PictureDetails> {
    const token: Token = await this.getToken();
    rax.attach(this.axiosInstance);

    return await this.axiosInstance
      .get(`${this.baseURL}/images/${id}`, {
        headers: {
          Authorization: token ? token.token : ""
        }
      })
      .then(response => {
        return response.data;
      });
  }

  public async getToken(): Promise<Token> {
    const token: Token | null = getLocalStorage<Token>("token");

    if (!token) {
      const response = await axios.post(`${this.baseURL}/auth`, {
        apiKey: this.apiKey
      });

      setLocalStorage<Token>("token", response.data);

      return response.data;
    }
    return token;
  }

  private async renewToken() {
    removeLocalStorage("token");
    return await this.getToken();
  }
}
