// src/api/mockApi.ts

export interface LoginResponse {
    success: boolean;
    message?: string;
  }
  
  export const login = async (username: string, password: string): Promise<LoginResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === "admin" && password === "password" || username === "Alice" && password === "Alice123") {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: "Invalid username or password" });
        }
      }, 1000);
    });
  };
  