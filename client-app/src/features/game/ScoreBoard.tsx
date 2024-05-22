import { observer } from "mobx-react-lite";
import { Image, Table, TableHeader, TableRow, TableHeaderCell, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer( function ScoreBoard() {

    const {gameStore: {user1, user2, score1, score2}} = useStore();

    return (
        <>
            <Image size = 'tiny' src = '/assets/logo.png' alt = 'logo' style = {{marginBottom: 12}} />
            <Header as = 'h5' >
                <Table className = "table_score" inverted>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell className = "player" textAlign = "center">
                                <Header className = "score_header" content = {user1} />
                            </TableHeaderCell>
                            <TableHeaderCell className = "score_cell"  textAlign = "center">
                                <Header className = "score_header" content = {`${score1} - ${score2}`} />
                            </TableHeaderCell>
                            <TableHeaderCell className = "player" textAlign = "center">
                                <Header className = "score_header" content = {user2} />
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                </Table>
            </Header>
        </>
    );
})