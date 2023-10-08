import { getCabins } from "../services/apiCabins"
import { useEffect } from "react"

const Cabins = () => {
    useEffect( ()=> {
        getCabins().then(data => console.log(data));
    },[])

    return (
        <div>
            I&apos;m a cabin page!
        </div>
    )
}

export default Cabins
