import api from '@/lib/axios';
import {isAxiosError} from 'axios';
import {ChangePasswordForm, UserProfileForm} from '../interfaces';

export async function updateProfile(formData: UserProfileForm) {
  try {
    const url = `/auth/profile`;
    const {data} = await api.put<string>(url, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function changePassword(formData: ChangePasswordForm) {
  try {
    const url = `/auth/update-password`;
    const {data} = await api.post<string>(url, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
