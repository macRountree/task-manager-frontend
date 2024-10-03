import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DashboardView} from '@/views/DashboardView';
import {AppLayout} from '@/layouts/AppLayout';
import {CreateProjectView} from './views/projects/CreateProjectView';
import {EditProjectView} from './views/projects/EditProjectView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* //*Global Route for Layout Component , children routes will be rendered */}

        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
