import { useReducer, createContext} from 'react'

export const GioHang = createContext()

const data = []

const reducer = (state, action) => {
    switch (action.type) {
        case 'LAY':
            return state = action.dsPhong
        case 'THEM':
            return [...state, action.phong]
        case 'XOA':
            return state = action.dsPhong 
        default:
            break;
    }
}  

const Context = ({children}) => {

    const [dsPhong, dispatch] = useReducer(reducer, data)

    return (
        <GioHang.Provider value={{dsPhong, dispatch}}>
            {children}
        </GioHang.Provider>
    )
}

export default Context