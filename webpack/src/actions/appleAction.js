import ajax from "../services/ajax";

const prefix = "apple/";

let actions = {
    pickApple:(dispatch,getState)=>{

        if(getState().isPicking){
            return;
        }

        dispatch(actions.beginPickApple());

        ajax({
            url:"/appleBasket/pickApple",
            method:"GET"
        }).done(data=>{
            dispatch(actions.donePickApple(data.weight))
        }).fail(xhr=>{
            dispatch(actions.failPickApple(xhr,responseText));
        })
    },
    beginPickApple:()=>({
        type:"apple/BEGIN_PICK_APPLE"
    }),
    donePickApple:appleWeight=>({
        type:"apple/DONE_PICK_APPLE",
        payload:appleWeight
    }),
    failPickApple:errMsg => ({
        type:"apple/FAIL_PICK_APPLE",
        payload:new Error(errMsg)
    }),
    eatApple:appleId => ({
        type:"apple/EAT_APPLE",
        payload:appleId
    })
};

export default actions;