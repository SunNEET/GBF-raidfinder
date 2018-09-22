import React from 'react';

const ConfigButton = (props) => {

    return (
        <div className="gbfrf-settings-fab__container">
            <div className="gbfrf-settings-fab__container">
                <button 
                    onClick={ e=>{ props.showDialog(e); }}     
                    className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--primary">
                    <i className="material-icons">add</i>
                    <span className="mdl-button__ripple-container">
                        <span className="mdl-ripple is-animating">
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ConfigButton;