import api from '@/lib/axios';
import {isAxiosError} from 'axios';
import {
  ForgotPasswordForm,
  NewPasswordFormu,
  RequestConfirmationCodeForm,
  TokenConfirmation,
  UserLoginForm,
  UserRegistrationForm,
  userSchema,
} from '../interfaces/index';
export async function registerUser(formaData: UserRegistrationForm) {
  try {
    const url = '/auth/register-user';
    const {data} = await api.post<string>(url, formaData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmAccount(token: TokenConfirmation) {
  try {
    const url = '/auth/confirm-account';
    const {data} = await api.post<string>(url, token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmationCode(
  email: RequestConfirmationCodeForm
) {
  try {
    const url = '/auth/request-code';
    const {data} = await api.post<string>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
}

export async function login(formData: UserLoginForm) {
  try {
    const url = '/auth/login';
    const {data} = await api.post<string>(url, formData);
    localStorage.setItem('LOGIN_TOKEN', data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function forgotPassword(email: ForgotPasswordForm) {
  try {
    const url = '/auth/forgot-password';
    const {data} = await api.post<string>(url, email);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validateToken(formData: TokenConfirmation) {
  try {
    const url = '/auth/validate-token';
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordFormu;
  token: TokenConfirmation['token'];
}) {
  try {
    const url = `/auth/update-password/${token}`;
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser() {
  try {
    const url = '/auth/user';
    const {data} = await api(url);
    const response = userSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
