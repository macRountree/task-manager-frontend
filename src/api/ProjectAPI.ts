import api from '@/lib/axios';
import {dashboardProjectSchema, Project, ProjectFormData} from '../interfaces';
import {isAxiosError} from 'axios';

export async function createProject(formData: ProjectFormData) {
  try {
    const {data} = await api.post('/projects', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAllProjects() {
  const getToken = localStorage.getItem('LOGIN_TOKEN');
  console.log(getToken, 'from get token');
  try {
    const {data} = await api('/projects', {
      headers: {
        Authorization: `Bearer ${getToken}`, //* must be Bearer token
      },
    });
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjectById(id: Project['_id']) {
  try {
    const {data} = await api(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

interface UpdateProjectData {
  formData: ProjectFormData;
  projectId: Project['_id'];
}
export async function updateProject({formData, projectId}: UpdateProjectData) {
  try {
    //* generic string is used if the response is not a GET request
    const {data} = await api.put<string>(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProject(id: Project['_id']) {
  try {
    const {data} = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
