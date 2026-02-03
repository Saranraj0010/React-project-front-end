import useStore from "./Zustand"

const Hook = () => {

    const { count,screen,add1, increase, decrease, add } = useStore();

    return (
        <>
            <div className="text-center w-fit h-fit bg-emerald-200 rounded-2xl p-4">

                <h1>{count}</h1>
                <h1 onClick={add1}>{screen}</h1>
                <div className="flex gap-3 justify-center mt-4">
                    <button onClick={increase} className="bg-red-500 text-white rounded-lg p-1">Increase One</button>
                    <button onClick={()=>decrease()} className="bg-red-500 text-white rounded-lg p-1">Decrease One</button>
                    <button onClick={add} className="bg-red-500 text-white rounded-lg p-1">Increase Five</button>
                </div>

            </div>

        </>
    )
}
export default Hook