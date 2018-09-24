import React, {Component} from 'react';
import ConfigButton from './config-button';
import ConfigPage from './config-page';


class ConfigSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {showDialog: false}
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
    }
    showDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({showDialog: true});
      }
    
    hideDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({showDialog: false});
    }
    render() {
        return(
            <div>
                <ConfigPage 
                    showDialog={this.state.showDialog}
                    hide={e => this.hideDialog(e)}
                    add={(title, subtitle) => this.props.addTweeterList(title, subtitle)}/>
                <ConfigButton 
                    showDialog={e => this.showDialog(e)}/>
            </div>
            
        );
    }
}

export default ConfigSetting;