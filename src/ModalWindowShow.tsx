import React from 'react'
import style from './ModalWindowShow.module.css'


type ModalWindowShowPropsType = {
    isOpend: boolean,
    title: string,
    onModalClose: () => void
}

const ModalWindowShow: React.FC<ModalWindowShowPropsType> = ({isOpend, children, title, onModalClose, ...restProps}) => {

    return (
        <div className={`${style.modal__wrapper} ${isOpend ? style.open : style.close}`}>
            <div className={style.modal__body}>
                <div>
                <div className={`${style.modal__close} ${style.close}`} onClick={onModalClose}>×</div>
                <h2>{`Здравствуйте, ${title}`}</h2>
                <hr/>
                {children}
                </div>
            </div>
        </div>
    )
}

export default ModalWindowShow
