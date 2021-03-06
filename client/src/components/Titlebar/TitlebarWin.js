import React, { useState } from 'react';
import './Titlebar-win.css'

const ipcRenderer = window.require('electron').ipcRenderer

const TitlebarWin = (props) => {

    const [isActive, setIsActive] = useState()
    const [isMaximized, setIsMaximized] = useState()

    ipcRenderer.on('focused', () => {
        setIsActive(true)
    })

    ipcRenderer.on('blurred', () => {
        setIsActive(false)
    })

    ipcRenderer.on('maximized', () => {
        setIsMaximized(true)
    })

    ipcRenderer.on('unmaximized', () => {
        setIsMaximized(false)
    })

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    const maximizeHandler = () => {
        ipcRenderer.invoke('maximize-event')
    }

    const unmaximizeHandler = () => {
        ipcRenderer.invoke('unmaximize-event')
    }

    const closeHandler = () => {
        ipcRenderer.invoke('close-event')
    }

    return (
        <div className="TitlebarWin">
            <div
                className={isActive ? 'Title-Bar' : 'Title-Bar-inactive'}
                style={ isActive ? {'background-color': props.bg[1]} : {'background-color': props.bg[0]}}
            >
                <div className="TitlebarWin-drag-region"></div>
                <div className="Title-Bar__section-icon">
                    <div className="section-icon__title">
                        {props.title}
                    </div>   
                </div>
                <div className="Title-Bar__section-menubar">
                </div>
                <div className="Title-Bar__section-center">
                </div>
                <div className="Title-Bar-Win__section-windows-control">
                    <div
                        className="section-windows-control_box-min" onClick={minimizeHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" strokeLinejoin="round"
                        className={isActive ? 'minimize-active_logo' : 'minimize-inactive_logo'}>
                            <rect x="0" y="50%" width="10.2" height="1" style={{'fill':props.fg}}/>
                            </svg>
                    </div>
                    {isMaximized ?
                        <div
                            className="section-windows-control_box-unmax" onClick={unmaximizeHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg"  width="10" height="10" viewBox="0 0 10 10" strokeLinejoin="round"
                            className={isActive ? 'maximize-active_logo' : 'maximize-inactive_logo'} style={{'fill':'red'}}>
                                <path d="M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z" style={{'fill':'red'}}/>
                            </svg>
                        </div>
                        :
                        <div
                            className="section-windows-control_box-max" onClick={maximizeHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg"  width="10" height="10" viewBox="0 0 10 10" strokeLinejoin="round"
                            className={isActive ? 'maximize-active_logo' : 'maximize-inactive_logo'}>
                                <path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" style={{'fill':props.fg}}/>
                            </svg>   
                        </div>
                    }
                    <div
                        className="section-windows-control_box-close" onClick={closeHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" strokeLinejoin="round" 
                        className={isActive ? 'close-active_logo' : 'close-inactive_logo'}>
                            <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" style={{'fill':props.fg}}/>
                        </svg>
                    </div>
                </div>
                <div
                    style={isMaximized ? { display: 'none' } : {}}
                    className="resizer">
                </div>
            </div>
        </div >
    )
}

export default TitlebarWin