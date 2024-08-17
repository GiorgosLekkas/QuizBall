import { observer } from "mobx-react-lite";
import { Grid, Header, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfileLeaderBoard() {

    const {accountStore} = useStore();

    return (
            <Grid>
                <Grid.Column width = {16}>
                    <Header floated = 'left' icon = 'trophy' content = 'LeaderBoard' />
                </Grid.Column>
                <Grid.Column width = {16}>
                    <Table unstackable>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell width = {1} textAlign = "center">GP</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">Won</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">Drawn</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">Lost</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">TP</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">Win%</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">PTS+</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">PTS-</TableHeaderCell>
                                <TableHeaderCell width = {1} textAlign = "center">+/-</TableHeaderCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell textAlign = "center">{accountStore.user?.gamesPlayed}</TableCell>
                                <TableCell textAlign = "center">{accountStore.user?.won}</TableCell>
                                <TableCell textAlign = "center">{accountStore.user?.drawn}</TableCell>
                                <TableCell textAlign = "center">{accountStore.user?.lost}</TableCell>
                                <TableCell textAlign = "center">{accountStore.user?.totalPoints}</TableCell>                            
                                <TableCell textAlign = "center">{accountStore.user?.winrate + "%"}</TableCell>
                                <TableCell textAlign = "center">{accountStore.user?.plus}</TableCell>
                                <TableCell textAlign = "center">{accountStore.user?.minus}</TableCell>
                                <TableCell textAlign = "center">{accountStore.user?.plus_Minus}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid.Column>
            </Grid>
    )
})