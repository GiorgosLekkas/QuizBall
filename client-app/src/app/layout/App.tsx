import './styles.css';
import NavBar from './NavBar';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const location = useLocation();
  const {commonStore, accountStore} = useStore();

  useEffect(() => {
    if (commonStore.token)
      accountStore.getUser().finally(() => commonStore.setAppLoaded());
    else 
      commonStore.setAppLoaded();
  }, [commonStore, accountStore])

  if(!commonStore.appLoaded) return <LoadingComponent content = 'Loading app...' />

  return (
    <>
      <ModalContainer/>
      <ToastContainer position='bottom-right' hideProgressBar theme = 'colored'/>
      {location.pathname === '/' ? <HomePage/> :(
        <>
          <NavBar/>
            <Container style = {{marginTop: '7em'}}>
              <Outlet />
            </Container>
        </>
      )}
    </>
  )
}

export default observer(App)