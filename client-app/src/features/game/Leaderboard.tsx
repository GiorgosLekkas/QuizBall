import { Header, Segment, Image, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function Leaderboard () {

    const {accountStore } = useStore();
    const {accountByScore} = accountStore;
    var i = 1;

    return (
        <Segment style = {{marginTop: '7em'}} >
            <Header as = 'h1'>Leaderboard</Header>
            <Table unstackable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell width = {1} textAlign = "center">Pos</TableHeaderCell>
                        <TableHeaderCell width = {5} textAlign = "center">User</TableHeaderCell>
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
                    {accountByScore.map(account => (
                        <TableRow>
                            <TableCell textAlign = "center">{i++}</TableCell>
                            <TableCell textAlign = "center">
                                <Image avatar spaced='right' src = {account?.photo?.url || '/assets/user.png'} />
                                {account.userName}
                            </TableCell>
                            <TableCell textAlign = "center">{account.gamesPlayed}</TableCell>
                            <TableCell textAlign = "center">{account.won}</TableCell>
                            <TableCell textAlign = "center">{account.drawn}</TableCell>
                            <TableCell textAlign = "center">{account.lost}</TableCell>
                            <TableCell textAlign = "center">{account.totalPoints}</TableCell>                            
                            <TableCell textAlign = "center">{account.winrate + "%"}</TableCell>
                            <TableCell textAlign = "center">{account.plus}</TableCell>
                            <TableCell textAlign = "center">{account.minus}</TableCell>
                            <TableCell textAlign = "center">{account.plus_Minus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Segment>
    )
})