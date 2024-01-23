import './styles.css'
import 'semantic-ui-css/semantic.min.css'
import NavBar from './NavBar';
import { Container} from 'semantic-ui-react';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { useEffect } from 'react';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';

function App() {

  const location = useLocation();
  const {commonStore, accountStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      accountStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  },[commonStore, accountStore])

  //if(!commonStore.appLoaded) return <LoadingComponent content = 'Loading App..'/>

  return (
    <>
      {location.pathname === '/' ? <HomePage/> : (
        <>
          <NavBar/>
          <Container style = {{marginTop: '7em'}}>
            <Outlet/>
          </Container>
        </>
      )}
    </>
  )
}

export default App
