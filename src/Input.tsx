import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import style from './Input.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type InputPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    label: string
}

const Input: React.FC<InputPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, label,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value.trim())
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    // const finalInputClassName = {`${error} ? ${s.errorInput} : ${s.input}`}

    return (
        <>
            <input
                type={'name'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={style.input}
                placeholder={label}
                {...restProps}
            />
            {<span >{error}</span>}

        </>
    )
}

export default Input
