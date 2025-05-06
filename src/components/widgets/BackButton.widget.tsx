
export default function BackButton({onClick}:any){

    return <button type="button" 
    className="fa-solid fa-chevron-left fa-1x rounded-full bg-white 
    border-sol border-[1px] border-slate-200
    p-2 shadow-lg w-[50px] h-[50px]" style={{color:`black`}} onClick={onClick}></button>
}