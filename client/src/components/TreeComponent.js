import React, { Component } from 'react';
import axios from "axios";
import TreePage from '../pages/TreePage'

const TREE_SERVICE_API = '/api'

export default class TreeComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      isFetching: false,
      data: {}
    }
  }

  componentDidMount(){
    this.fetchTreeRootWithAxios();
    // console.log("componentWillMount: ", this.state)
  }

  componentWillUnmount(){
    this.setState({isFetching: false, data: {}})
  }

  fetchTreeRootWithAxios() {
    this.setState({...this.state, isFetching: true})
    axios.get(TREE_SERVICE_API)
      .then(res => { 
        this.setState({data: res.data, isFetching: false}) 
      })
      .catch(err => {
        console.log("fetchTreeRootWithAxios: ", err)
        this.setState({...this.state, isFetching: false})
      })
  }

  render(){
    return(
      <TreePage data={this.state.data} isFetching={this.state.isFetching} />
    )
  }

}