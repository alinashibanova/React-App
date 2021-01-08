import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Florist from '../Florist/Florist';

import { getFlorists, addFlorist } from '../../model/model';

import { downloadOrdersDataAction, addFloristAction } from '../../store/actions';
import './App.css';

class App extends PureComponent {

    state = {
        isInputActive: false,
        inputValue: ''
    };

    async componentDidMount() {
        const florists = await getFlorists();
        this.props.downloadOrdersDataDispatch(florists);
    }

    inputFlorist = () => {
        this.setState({
            isInputActive: true
        });
    }

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
          this.setState({
            isInputState: false,
            inputValue: ''
          });
        }
    
        if (event.key === 'Enter') {
            const orderArrName = this.state.inputValue;

            this.setState({
                isInputState: false,
                inputValue: ''
            })
            const orderArr = { name: orderArrName, orders: [] };
            await addFlorist(orderArr);
            this.props.addFloristDispatch(orderArr);
        }
    }
    
    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const { inputValue, isInputActive } = this.state;

        return (
            <Fragment>
                <header id="main-header">
                    Flower Shop
                </header>
                <main id="main-container">
                    {this.props.florists.map((orderArr, index) => (
                        <Florist key={`orderarr-${index}`} orderArrId={index}/>
                    ))}
                    <div className="orderarr">
                    {isInputActive && <input
                        type="text"
                        id="add-orderarr-input"
                        placeholder="Имя флориста"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                    />}
                    {!isInputActive && <header className="orderarr-name" onClick={this.inputFlorist}>
                        Добавить флориста
                    </header>}
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ florists }) => ({ florists });

const mapDispatchToProps = dispatch => ({
    addFloristDispatch: (orderArr) => dispatch(addFloristAction(orderArr)),
    downloadOrdersDataDispatch: (florists) => dispatch(downloadOrdersDataAction(florists)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
