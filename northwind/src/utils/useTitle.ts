import { useEffect } from "react";

//this is a custom hook
function useTitle(title: string): void{
    useEffect(()=>{
        document.title = title;
    },[])
}

export default useTitle;