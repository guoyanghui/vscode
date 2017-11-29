import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import AppleItem from "../components/AppleItem";
import actions from "../actions/appleAction";


class AppleBusket extends Component{
    render(){

        let {state, actions} = this.props;

        let mockState ={
            isPicking:false,
            newAppleId:3,
            apples:[
                {
                    id:1,
                    weight:235,
                    isEaten:true
                },
                {
                    id:2,
                    weight:256,
                    isEaten:false
                }
            ]
        };

        state = mockState;

        let stats = {
            /*当前苹果的数据*/
            appleNow:{
                quantity:0,
                weight:0
            },
            /*已经吃掉的数据*/
            appleEaten:{
                quantity:0,
                weight:0
            }
        };

        state.apples.map((apple)=>{
            let selector = apple.isEaten?"appleEaten":"appleNow";
            stats[selector].quantity++;
            stats[selector].weight += apple.weight;
        });


        return (
            <div className="appleBusket">
                <div className="title">
                    苹果篮子
                </div>
                <div className="state">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content"><span className="apple-num">{stats.appleNow.quantity}</span>个苹果，<span>{stats.appleNow.weight}</span>克</div>
                    </div>
                    <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content"><span className="apple-num">{stats.appleEaten.quantity}</span>个苹果，<span>{stats.appleEaten.weight}</span>克</div>
                    </div>
                </div>
                <div className="appleList">
                    {state.apples.map(apple=>
                        <AppleItem state={apple}
                                   actions={{eatApple:actions.eatApple}}
                                   key={apple.id}
                    />)}
                </div>
                <div className="btn-div">
                    <button onClick={()=>dispatch(actions.pickApple())}>摘苹果</button>
                </div>
            </div>
        )
    }
}


function select(state){
    return {
        state:state.appleBusket
    }
}


function buildActionDispatcher(dispatch){
    return {
        actions:bindActionCreators(actions,dispatch)
    }
}

export default connect(select,buildActionDispatcher)(AppleBusket);