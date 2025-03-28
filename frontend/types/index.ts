export type Course = {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
};

export interface LoginSuccessResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface LoginErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  trace?: string;
}
