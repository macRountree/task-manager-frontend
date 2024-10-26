import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DashboardView} from '@/views/DashboardView';
import {AppLayout} from '@/layouts/AppLayout';
import {CreateProjectView} from './views/projects/CreateProjectView';
import {EditProjectView} from './views/projects/EditProjectView';
import {ProjectDetailsView} from './views/projects/ProjectDetailsView';
import {AuthLayout} from './layouts/AuthLayout';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import ConfirmAccountView from './views/auth/ConfirmAccount';
import RequestNewCodeView from './views/auth/RequestNewCodeView';
import {NewPasswordView} from './views/auth/NewPasswordView';
import ForgotPasswordView from './views/auth/ForgotPasswordView';
import {ProjectTeamView} from './views/projects/ProjectTeamView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* //*Global Route for Layout Component , children routes will be rendered */}

        {/* App Layout Child Routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />
        </Route>
        {/* Auth layout Child Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          ></Route>
          <Route
            path="/auth/request-code"
            element={<RequestNewCodeView />}
          ></Route>
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          ></Route>
          <Route
            path="/auth/new-password"
            element={<NewPasswordView />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
