import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  // Add New Job
  const addJob = (newJob) => {
    return fetch('/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Invalid api password');
          } else {
            throw new Error('Failed to add job');
          }
        }
        return response.json();
      });
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/jobs/${id}`, {
        method: 'DELETE',
      });

      if (res.status === 403) {
        throw new Error('Invalid API password');
      }

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to delete job');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete job');
    }
  };

  // Update Job
  const updateJob = async (job) => {
    try {
      const res = await fetch(`/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Pass the API password in the headers
          'API-Password': job.apiPassword,
        },
        body: JSON.stringify(job),
      });

      if (res.status === 403) {
        throw new Error('Invalid api password');
      }

      if (!res.ok) {
        throw new Error('Failed to update job');
      }

      // Optionally, you can handle other status codes here

      return res.json(); // Return the response data if needed
    } catch (error) {
      throw new Error(error.message);
    }
  };


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;