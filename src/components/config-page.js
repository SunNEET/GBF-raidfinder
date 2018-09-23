import React, {Component} from 'react';

class ConfigPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 0,
            normalBossList: [] 
        };
    }

    componentDidMount() {
        fetch('/normalRaidBoss')
            .then(res => res.json())
            .then(result => {
                const data = JSON.parse(result);
                var arr = [];
                data.forEach(el => {
                    // this.setState({normalBossList: this.state.normalBossList.concat(el)});
                    arr.push(el);
                });
                this.setState({normalBossList: arr});
            })
    }

    render() {
        const bossList = this.state.normalBossList.map((boss) => {
            console.log(boss);
            return (
                <li key={boss.title} onClick={() => 
                    this.props.add(boss.title, boss.subtitle)} className="gbfrf-js-bossSelect gbfrf-follow__boss-box mdl-list__item mdl-list__item--two-line" >
                    <span className="mdl-list__item-primary-content">
                        <span>
                            {boss.title}
                        </span>
                        <span className="gbfrf-follow__boss-box-subtitle mdl-list__item-sub-title">
                            {boss.subtitle}
                        </span>
                    </span>
                </li>
            );
        });
        
        return(
            <dialog className="mdl-dialog gbfrf-dialog" open={this.props.showDialog ? 'open': ''}>
                <div className="mdl-layout__container">
                    <div className="gbfrf-main-dialog gbfrf-dialog__container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs is-upgraded is-small-screen">
                        <header className="mdl-layout__header is-casting-shadow">
                            <div className="mdl-layout__header-row gbfrf-column__header-row">
                                <div className="mdl-layout-spacer"></div>
                                <div className="mdl-button mdl-js-button mdl-button--icon material-icons js-close-dialog">
                                    <i className="material-icons" onClick={this.props.hide}>clear</i>
                                </div>
                            </div>
                        </header>
                        <section className="gbfrf-dialog__content mdl-layout__tab-panel is-active">
                            <ul className="mdl-list" >
                                {bossList}
                            </ul>
                        </section>
                    </div>
                </div>
            </dialog>
        );
    }
}

export default ConfigPage;

// onClick={()=> {document.getElementsByClassName("mdl-dialog")[0].removeAttribute("open") }}