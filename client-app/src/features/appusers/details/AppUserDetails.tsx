import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta } from "semantic-ui-react";
import { AppUser } from "../../../app/models/AppUser";

interface Props{
    appUsers: AppUser
}

export default function AppUserDetails({appUsers}: Props) {
    return (
        <Card>
            <CardContent>
                <CardHeader>{appUsers.userName}</CardHeader>
                <CardMeta>
                    <div>{appUsers.birthDate}</div>
                </CardMeta>
                <CardDescription>
                    <div>{appUsers.firstName}</div>
                    <div>{appUsers.lastName}</div>
                    <div>{appUsers.email}</div>
                    <div>{appUsers.role}</div>
                    <div>{appUsers.gender}</div>
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button floated = "right" content = 'view' color = "teal" />
            </CardContent>
        </Card>
    )
}