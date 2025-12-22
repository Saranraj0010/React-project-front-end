import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// const Zustand = create((set) => ({
//   count: 0,
//   increase:()=>set((state)=>({count:state.count+1})),
//   decrease:()=>set((state)=>({count:state.count-1}))
// }))
const Zustand = create(
  (use) => ({
    count: 0,
    screen:'false',
    increase: () => use((state) => ({ count: state.count + 1 })),
    decrease: () => use((state) => ({ count: state.count - 1 })),
    add:()=>use((state)=>({count:state.count +5})),
    add1:()=>use((state)=>({screen: state.screen ='true,' }))
  })
  // {name:"count-data"}
)

export default Zustand  