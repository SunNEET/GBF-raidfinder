import React, {Component} from 'react';

class ConfigPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            normalBossList: [],
            hlBossList: [],
            eventBossList: [],
            isActive: [true, false, false]
        };
    }

    componentDidMount() {
        fetch('/normalRaidBoss')
            .then(res => res.json())
            .then(result => {
                var data = JSON.parse(result);
                var arr = [];
                data.forEach(el => {
                    arr.push(el);
                });
                this.setState({normalBossList: arr});
            }).catch(()=>{
                console.log("Promise Rejected");
            });
        
        fetch('/hlRaidBoss')
            .then(res => res.json())
            .then(result => {
                var data = JSON.parse(result);
                var arr = [];
                data.forEach(el => {
                    arr.push(el);
                });
                this.setState({hlBossList: arr});
            }).catch((e)=>{
                console.log(e);
            });

        fetch('/eventRaidBoss')
            .then(res => res.json())
            .then(result => {
                var data = JSON.parse(result);
                var arr = [];
                data.forEach(el => {
                    arr.push(el);
                });
                this.setState({eventBossList: arr});
            }).catch((e)=>{
                console.log(e);
            });
    }

    toggleActive(tabNumber) {
        var newStatus = [false, false, false];
        newStatus[tabNumber] = true;
        this.setState({isActive: newStatus, bossType: tabNumber});
    }

    BossList(tabNunber) {
        const callback = (boss) => {
            // console.log(boss);
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
        }
        if(tabNunber === 0) {
            return this.state.normalBossList.map( boss => callback(boss));
        } else if(tabNunber===1) {
            return this.state.hlBossList.map(boss=>callback(boss));
        } else {
            return this.state.eventBossList.map(boss=>callback(boss));
        }
    }

    render() {
        
        return(
            <dialog className="mdl-dialog gbfrf-dialog" open={this.props.showDialog ? 'open': ''}>
                <div className="mdl-layout__container">
                    <div className="gbfrf-main-dialog gbfrf-dialog__container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs is-upgraded is-small-screen">
                        <header className="mdl-layout__header is-casting-shadow">
                            <div className="mdl-layout__header-row gbfrf-column__header-row gbfrf-dialog__tab-bar">
                                <div 
                                    className={"gbfrf-dialog__tab-bar-item mdl-layout__tab " + (this.state.isActive[0] ? "is-active": "" )} 
                                    onClick={()=>this.toggleActive(0)}>
                                    Normal
                                </div>
                                <div 
                                    className={"gbfrf-dialog__tab-bar-item mdl-layout__tab " + (this.state.isActive[1] ? "is-active": "" )}
                                    onClick={()=>this.toggleActive(1)}>
                                    High Level
                                </div>
                                <div 
                                    className={"gbfrf-dialog__tab-bar-item mdl-layout__tab " + (this.state.isActive[2] ? "is-active": "" )}
                                    onClick={()=>this.toggleActive(2)}>
                                    Event/GuildWar
                                </div>
                                {/* <div className="mdl-layout-spacer"></div> */}
                                <div className="mdl-button mdl-js-button mdl-button--icon material-icons">
                                    <i className="material-icons" onClick={this.props.hide}>clear</i>
                                </div>
                            </div>
                        </header>
                        <section className={"gbfrf-dialog__content mdl-layout__tab-panel " + (this.state.isActive[0] ? "is-active": "" ) }>
                            <ul className="mdl-list" style={{padding: '0px', margin: '0px'}}>
                                {this.BossList(0)}
                            </ul>
                        </section>
                        <section className={"gbfrf-dialog__content mdl-layout__tab-panel " + (this.state.isActive[1] ? "is-active": "" )}>
                            <ul className="mdl-list" style={{padding: '0px', margin: '0px'}}>
                                {this.BossList(1)}
                            </ul>
                        </section>
                        <section className={"gbfrf-dialog__content mdl-layout__tab-panel " + (this.state.isActive[2] ? "is-active": "" )}>
                            <ul className="mdl-list" style={{padding: '0px', margin: '0px'}}>
                                {this.BossList(2)}
                            </ul>
                        </section>
                    </div>
                </div>
            </dialog>
        );
    }
}

export default ConfigPage;