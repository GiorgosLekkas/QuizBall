import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";
import { useStore } from "../../stores/store";

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function MyTextInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    const {questionStore} = useStore();
    const categories = [
        'Fans Question',
        'Find Player By Photo',
        'Find The Stadium',
        'Geography',
        'Gossip',
        'Guess The Player',
        'Guess The Score',
        'Higher Lower',
        'History',
        'Logo Quiz',
        'Manager id',
        'Player id',
        'Top5',
        'Who Is Missing'
    ]
    
    return (
        <Form.Field error = {meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable
                selection
                options = {props.options}
                value = {field.value || null}
                onChange = {(e, d) => {
                    e;
                    helpers.setValue(d.value)
                    if( d.value && categories.includes(d.value.toString())){
                        questionStore.setCategory(d.value.toString());
                    }
                }}
                //onBlur = {() => helpers.setTouched(true)}
                placeholder = {props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label className = "error_mes" basic color = 'red' > {meta.error} </Label>
            ): null}
        </Form.Field>
    )

}