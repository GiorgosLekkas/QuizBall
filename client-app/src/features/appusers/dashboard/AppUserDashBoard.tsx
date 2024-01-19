import { Grid } from "semantic-ui-react";
import { AppUser } from "../../../app/models/AppUser";
import AppUserList from "./AppUserList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AppUserDashBoard() {

    const [appUsers, setAppUsers] = useState<AppUser[]>([]);

    useEffect(() => {
        axios.get<AppUser[]>('http://localhost:5000/api/AppUser')
        .then(response =>{
            setAppUsers(response.data);
        })
    },[])

    return (
        <Grid>
            <Grid.Column width = '10'>
                <AppUserList appUsers = {appUsers} />
            </Grid.Column>
        </Grid>
    )
}