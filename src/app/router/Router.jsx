import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import Home from '../../pages/Home/Home';
import Items from '../../pages/Items/Items';
import Heroes from '../../pages/Heroes/Heroes';
import Bosses from '../../pages/Bosses/Bosses';
import PatchNotes from '../../pages/PatchNotes/PatchNotes';
import Downloads from '../../pages/Downloads/Downloads';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'items', element: <Items /> },
      { path: 'heroes', element: <Heroes /> },
      { path: 'bosses', element: <Bosses /> },
      { path: 'patch-notes', element: <PatchNotes /> },
      { path: 'downloads', element: <Downloads /> },
    ],
  },
]);