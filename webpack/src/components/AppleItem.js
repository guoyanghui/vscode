import React,{Component} from "react";

class AppleItem extends Component{
    shouldComponentUpdate(nextProps) {
        return nextProps.state != this.props.state;
    }
    render(){
        let {state, actions} = this.props;

        let mockState = {
            id:1,
            weight:256,
            isEaten:false,
        };

        let mockActions = {
            eatApple:id =>console.log("eatApple",id)
        };

        state = mockState;actions = mockActions;

        if(state.isEaten){
            return null;
        }

        return (
            <div className="appleItem">
                <div className="appleImg">
                    <img src="../images/apple.jpg"/>
                </div>
                <div className="appleInfo">
                    <div className="appleName">红苹果-{state.id}号</div>
                    <div className="appleWeight">{state.weight}克</div>
                </div>
                <div className="btn-active">
                    <button onClick={()=>{
                        actions.eatApple(state.id)
                    }}>吃掉</button>
                </div>
            </div>
        )
    }
}

export default AppleItem;