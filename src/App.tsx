import React, {useState} from 'react';
import style from './App.module.css'
import './reset.css';
import Input from "./Input";
import ModalWindowShow from "./ModalWindowShow";

function App() {

    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [errorName, setErrorName] = useState<string>('')
    const [errorLastname, setErrorLastname] = useState<string>('')
    const [modal, setModal] = useState({modal: false});

    const onModalClose = () => {
        setModal({...modal, modal: false});
        setName('');
        setLastName('');
    };

    const onShowName = () => {
        if (name && !lastName) {
            setErrorLastname('Вы забыли написать фамилию')
            errorName && setErrorName('');
        } else if (!name && lastName) {
            setErrorName('Вы забыли написать имя')
            errorLastname && setErrorLastname('');
        } else if (name && lastName) {
            setModal({...modal, modal: true});
            errorName && setErrorName('');
            errorLastname && setErrorLastname('');
            // error && setError('');
        }
    };

    return (
        <div className={style.App}>

            <div className={style.formContainer}>

                <div className={style.inputContainer}>
                    <Input
                        value={name}
                        onChangeText={setName}
                        onEnter={onShowName}
                        error={errorName}
                        label={'Name'}
                    />
                </div>

                <div className={style.inputContainer}>
                    <Input
                        value={lastName}
                        onChangeText={setLastName}
                        onEnter={onShowName}
                        error={errorLastname}
                        label={'Lastname'}
                    />
                </div>

                <button onClick={onShowName} disabled={!name && !lastName}>Show Name</button>

            </div>

            <div className={style.modalTitle}>

                <ModalWindowShow
                    isOpend={modal.modal}
                    title={`${name} ${lastName}`}
                    onModalClose={onModalClose}
                />

            </div>
        </div>
    );
}

export default App;
