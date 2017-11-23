import Button from './Button';
import Dialog from './Dialog';
import Excel from './Excel';
import Form from './Form';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Whinepad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      addnew: false,
    };

    this.preSearchData = null;
  }

  addNewDialog() {
    this.setState({ addnew: true });
  }

  addNew(action) {
    console.log('action: ', action)
    if (action === 'dismiss') {
      this.setState({ addnew: false });
      return;
    }

    const data = [this.refs.form.getData(), ...this.state.data]

    console.log('this.refs.form.getData(): ', this.refs.form.getData())
    console.log('this.state.data: ', this.state.data)
    console.log('data: ', data)
    
    this.setState({
      addnew: false,
      data,
    });
    
    this.commitToStorage(data);
  }

  onExcelDataChange(data) {
    console.log('excel changed')
    this.setState({ data });
    this.commitToStorage(data);
  }

  commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  startSearching() {
    this.preSearchData = this.state.data;
  }

  doneSearching() {
    this.setState({ data: this.preSearchData });
  }

  search(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({ data: this.preSearchData });
      return;
    }

    const fields = this.props.schema.map(item => item.id);
    const searchdata = this.preSearchData.filter(row => {
      for (let i = 0; i < fields.length; i++) {
        if (row[fields[i]].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }

      return false;
    });

    this.setState({ data: searchdata });
  }

  render() {
    console.log('render');
    return (
      <div className="Whinepad">
        <div className="WhinepadToolbar">

          <div className="WhinepadToolbarAdd">
            <Button
              onClick={this.addNewDialog.bind(this)}
              className="WhinepadToolbarAddButton"
            >
              + add
            </Button>
          </div>

          <div className="WhinepadToolbarSearch">
            <input
              placeholder="Search..."
              onChange={this.search.bind(this)}
              onFocus={this.startSearching.bind(this)}
              onBlur={this.doneSearching.bind(this)} />
          </div>
        </div>

        <div className="WhinepadDatagrid">
          <Excel
            schema={this.props.schema}
            initialData={this.state.data}
            onDataChange={this.onExcelDataChange.bind(this)} />
        </div>
        {
          this.state.addnew
            ? <Dialog
              modal={true}
              header="Add new item"
              confirmLabel="Add"
              onAction={this.addNew.bind(this)}
            >
              <Form
                ref="form"
                fields={this.props.schema} />
            </Dialog>
            : null
        }
      </div>
    );
  }
}

Whinepad.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object),
  initialData: PropTypes.arrayOf(PropTypes.object),
}

export default Whinepad;
