import { useState } from 'react';
import { FormField, Form, Checkbox, Segment, Grid, GridRow, GridColumn, Header, Button, Image, Label } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import { useNavigate } from 'react-router-dom';
import { runInAction } from 'mobx';

export default function SelectCategoriess() {

    const {gameStore} = useStore();

    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);
    const [gameStart, setStartGame] = useState<boolean>(false);

    const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
        'Fans Question' : false,
        'Find Player By Photo' : false,
        'Find The Stadium' : false,
        'Geography' : false,
        'Gossip' : false,
        'Guess The Player' : false,
        'Guess The Score' : false,
        'Higher Lower' : false,
        'History' : false,
        'Logo Quiz' : false,
        'Manager id' : false,
        'Player id' : false,
        'Top5' : false,
        'Who Is Missing' : false
    })

    const handleCheckboxChange = (name: string) => {
        setCheckboxes({ ...checkboxes, [name]: !checkboxes[name] });
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        runInAction(() => {
            gameStore.categories = Object.entries(checkboxes).filter(([isChecked]) => isChecked).map(([name]) => name);
            console.log(gameStore.categories);
        });

        if(gameStore.categories.length === 5){
            setStartGame(true);
            setTimeout(() => {
                setStartGame(false);
                gameStore.gameQuestions();
                navigate(`/game`);
            }, 1000);
        } else {
            setError(true);
        }
    }

    return (
        <>
            <Segment style = {{marginTop: '7em'}} >
                <Header as = 'h1' content = 'Select Categories' color = 'black' textAlign = 'center' style = {{paddingBottom: '10px'}} />
                <Form onSubmit = {handleSubmit} style = {{paddingLeft: '40px'}} >
                    <Grid columns='three' width = "5">
                        <GridRow>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Fans Question.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Fans Question
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Fans Question'
                                        onChange = {() => handleCheckboxChange('Fans Question')}
                                    >
                                    </Checkbox>
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Find Player By Photo.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Find Player By Photo
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Find Player By Photo'
                                        onChange = {() => handleCheckboxChange('Find Player By Photo')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Find The Stadium.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Find The Stadium
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Find The Stadium'
                                        onChange = {() => handleCheckboxChange('Find The Stadium')}
                                    />
                                </FormField>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Geography.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Geography
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Geography'
                                        onChange = {() => handleCheckboxChange('Geography')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Gossip.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Gossip
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Gossip'
                                        onChange = {() => handleCheckboxChange('Gossip')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Guess The Player.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Guess The Player
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Guess The Player'
                                        onChange = {() => handleCheckboxChange('Guess The Player')}
                                    />
                                </FormField>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Guess The Score.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Guess The Score
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Guess The Score'
                                        onChange = {() => handleCheckboxChange('Guess The Score')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Higher Lower.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Higher Lower
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Higher Lower'
                                        onChange = {() => handleCheckboxChange('Higher Lower')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/History.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    History
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'History'
                                        onChange = {() => handleCheckboxChange('History')}
                                    />
                                </FormField>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Logo Quiz.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Logo Quiz
                                                </Header>
                                            </label>
                                        }
                                        name='checkboxRadioGroup'
                                        value='Logo Quiz'
                                        onChange = {() => handleCheckboxChange('Logo Quiz')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Manager id.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Manager id
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Manager id'
                                        onChange = {() => handleCheckboxChange('Manager id')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Player id.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Player id
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Player id'
                                        onChange = {() => handleCheckboxChange('Player id')}
                                    />
                                </FormField>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Top5.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Top5
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Top5'
                                        onChange = {() => handleCheckboxChange('Top5')}
                                    />
                                </FormField>
                            </GridColumn>
                            <GridColumn>
                                <FormField>
                                    <Checkbox
                                        label = {
                                            <label>
                                                <Header as = 'h2'>
                                                    <Image size = 'huge'><img src = {`/assets/Questions_Logo/Who Is Missing.png`} alt = "logo" className = 'category_selection_image' ></img></Image>
                                                    Who Is Missing
                                                </Header>
                                            </label>
                                        }
                                        name = 'checkboxRadioGroup'
                                        value = 'Who Is Missing'
                                        onChange = {() => handleCheckboxChange('Who Is Missing')}
                                    />
                                </FormField>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                    <Button loading = {gameStart} disabled = {gameStart} content = 'Submit' style = {{marginTop: '30px'}} color = 'green' />
                    <Label className = "error_mes" style = {{marginBottom: 10}} basic color = 'red' content = {error ? "Wrong number of categories, you should select N categories!" : ""} /> 
                </Form>
            </Segment>
        </>
    )
}