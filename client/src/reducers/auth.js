import axios from "axios"

export const getAdmins = () => {
    return async (dispatch) => {

        dispatch({ type: 'GET_ADMINS' })
        const response = await axios.get('https://react-socialogram.onrender.com/user/signup')
        if (response) {
            dispatch({ type: 'GET_ADMINS_COMPLETED', payload: response.data.data })
        }
        if (!response) {
            dispatch({ type: 'GET_ADMINS_FAILED' })
        }
    }
}



const authReducer=(state={data:[],isLoading:false},action)=>{
    switch(action.type){
        
        case 'AUTH':
            localStorage.setItem('Profile',JSON.stringify({...action?.data}))
            return {...state,data:action?.data }    
        
        case 'GET_ADMINS':
            localStorage.getItem('Profile',JSON.stringify({...action?.data}))
            return {isLoading:true,...state,data:action?.data}

        case 'GET_ADMINS_COMPLETED':
            
            return {isLoading:false,...state,data:action?.data}
        case 'GET_ADMINS_FAILED':
            
            return {
                
                isLoading: false,
                authData: []
            }
        default:
            return state;
    }
} 

export default authReducer
